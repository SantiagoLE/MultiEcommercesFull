const jwt = require('jsonwebtoken');
require('dotenv').config();
const axios = require('axios');

const verifyJWT = (allowedRoles) => (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).send('Acceso denegado');

        const { loginUser, generalSettings } = decoded;

        // Verificar si el rol del usuario está en los roles permitidos
        if (!allowedRoles.includes(loginUser.role)) {
            return res.status(403).send('Acceso denegado: No tienes permiso para acceder a esta ruta.');
        }

        // Verificar usuario con rol "user" y con restriccion de tiempo
        if (loginUser.role === 'user' && loginUser.restrictedTime) {

            axios.get(process.env.TIME_URL, {timeout: 10000}) // Verifico la hora mediante una api externa
                .then(response => {
                    
                    const { workStart, workEnd, workDays } = generalSettings;

                    const traslateAllDays = {
                        'Sunday': 'Domingo',
                        'Monday': 'Lunes',
                        'Tuesday': 'Martes',
                        'Wednesday': 'Miercoles',
                        'Thursday': 'Jueves',
                        'Friday': 'Viernes',
                        'Saturday': 'Sabado'
                    };

                    const today = traslateAllDays[response.data.dayOfWeek]

                    // Verificacion dias laborales
                    if (!workDays.includes(today)) {
                        return res.status(403).send('Acceso restringido: Dia no laboral.');
                    }

                    const currentTime = response.data.time

                    // Verificar rango de tiempo laboral
                    function isTimeInRange(workStart, workEnd, currentTime) {

                        const toMinutes = time => {
                            const [hours, minutes] = time.split(':').map(Number);
                            return hours * 60 + minutes;
                        };

                        const workStartMin = toMinutes(workStart);
                        const workEndMin = toMinutes(workEnd);
                        const currentTimeMin = toMinutes(currentTime);

                        if (workStartMin <= workEndMin) { // El rango de tiempo no cruza la media noche
                            return currentTimeMin >= workStartMin && currentTimeMin <= workEndMin;
                        } else { // El rango de tiempo cruza la media noche
                            return currentTimeMin >= workStartMin || currentTimeMin <= workEndMin;
                        }
                    }

                    if (!isTimeInRange(workStart, workEnd, currentTime)) {
                        return res.status(403).send('Acceso restringido: Fuera del horario laboral.');
                    }

                    req.user = decoded.loginUser;
                    return next();
                })
                .catch(err => {
                    console.log(err.message)
                    res.status(500).send(`Error en el servidor: ${err.message}`);
                });

        } else {
            req.user = decoded.loginUser;
            return next();
        }
    });
};





module.exports = verifyJWT;
