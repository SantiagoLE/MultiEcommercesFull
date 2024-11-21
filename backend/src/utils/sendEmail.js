const nodemailer = require('nodemailer');

const sendEmail = (options) => new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({  // 1. Configuración del transportador
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_APP_PASSWORD
        },
        tls: {
            // rejectUnauthorized: false  // para desarrollo
            rejectUnauthorized: true // Mejorar seguridad en produccion
        },
        // secure: false  // para desarrollo
        secure: true // Usar SSL/TLS en produccion
    })

    const mailOptions = {  // 2. Configuración del email
        from: process.env.EMAIL,
        ...options // Operador de propagacion, exparce todo lo que viene en options
    }

    transporter.sendMail(mailOptions, (error, info) => { // 3. Envío del email 
        if (error) {
            console.error('Error al enviar email:', error, info);
            return reject({ message: 'Ha ocurrido un error con el envio del email' });
        }
        return resolve({ message: 'Email enviado correctamente' });
    });
})
module.exports = sendEmail;
