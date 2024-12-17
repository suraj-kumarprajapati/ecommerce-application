import nodemailer from "nodemailer";


// this function will send the email to the user
const sendEmail = async (options) => {
    // transport object provided by mailtrap to test the email
    const transport = nodemailer.createTransport({

        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },

    });

    
    // prepare message 
    const message = {
        from : `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to : options.email,
        subject : options.subject,
        html : options.message,
    }

    // send the message
    await transport.sendMail(message);
}


export default sendEmail;