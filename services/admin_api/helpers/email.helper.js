import nodemailer from 'nodemailer';

const send = async (infoObj) => {
    try {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SMTP,
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        // send mail with defined transport object
        let info = await transporter.sendMail(infoObj);

        console.log('Message sent: %s', info.messageId);

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (error) {
        console.log(error);
    }
};
export const emailProcessor = ({ fname, email, pin }) => {
    const link = `http://localhost:3000/email-verification?pin=${pin}&email=${email}`;
    let info = {
        from: `"SWAPI SWAP" <${process.env.EMAIL_USER}>`, // sender address
        to: email, // list of receivers
        subject: 'Email confirmation required. ✔', // Subject line
        text: `Hi ${fname}, please follow the link below to confirm the email. ${link}`, // plain text body
        html: `Hi ${fname}.
        <br/><br/>
        Please follow the link below to confirm your email.<br/><br/>
        ${link}
        Thank you.<br/><br/>
        Kind regards.
        --SWAPI SWAP--`, // html body
    };
    send(info);
};
