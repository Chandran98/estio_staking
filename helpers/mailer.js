
const nodemailer = require("nodemailer");


const sendMail = (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.MAIL_PASSWORD,
            }, secure: false
        })
        const mailData = ({
            from: "chandranjc16@gmail.com",
            to: to,
            subject: subject,
            text: text,
        })
        transporter.sendMail(mailData,
            // (err, data) => {
            //     if (err) return false
            //     if (data) return true
            // }
        )
        return true;
    } catch (error) {

        console.log(error);
        return false;
    }

}

module.exports = { sendMail }