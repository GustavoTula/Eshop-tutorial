// Módulo para enviar correos electrónicos utilizando Nodemailer
const nodemailer = require("nodemailer");

// Función asíncrona para enviar correos electrónicos
const sendMail = async (options) => {
    // Crea un transportador Nodemailer con la configuración proporcionada en variables de entorno
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });

    // Configura las opciones del correo electrónico
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    // Utiliza el transportador para enviar el correo electrónico con las opciones configuradas
    await transporter.sendMail(mailOptions);
};

// Exporta la función sendMail para que pueda ser utilizada en otros módulos
module.exports = sendMail;
