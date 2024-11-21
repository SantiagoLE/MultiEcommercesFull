const jwt = require('jsonwebtoken');
require('dotenv').config();
const axios = require('axios');

const verifyJWT = (allowedRoles) => (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).send('Acceso denegado');

        const { user, generalSettings } = decoded;

        // Verificar si el rol del usuario está en los roles permitidos
        if (!allowedRoles.includes(user.role)) {
            return res.status(403).send('Acceso denegado: No tienes permiso para acceder a esta ruta.');
        }

        // Verificar usuario con rol "user" y con restriccion de tiempo
        if (user.role === 'user' && user.restrictedTime) {


            axios.get(process.env.TIME_URL)
                .then(response => {

                    const { workStart, workEnd, workDays } = generalSettings;

                    const allDays = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
                    const today = allDays[response.data.day_of_week];

                    // Verificacion dias laborales
                    if (!workDays.includes(today)) {
                        console.log("Dia no laboral")
                        return res.status(403).send('Acceso restringido: Dia no laboral.');
                    }

                    const currentTime = new Date(response.data.datetime).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false })


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

                    req.user = decoded.user;
                    return next();
                })
                .catch(err => {
                    res.status(500).send('Error en el servidor.');
                });

        } else {
            req.user = decoded.user;
            return next();
        }
    });
};





module.exports = verifyJWT;
