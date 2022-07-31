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
const emailProcessor = ({ email, subject, text, html }) => {
    let info = {
        from: `"SWAPI SWAP" <${process.env.EMAIL_USER}>`, // sender address
        to: email, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
    };
    send(info);
};

export const sendEmailVerificationLink = (emailObj) => {
    const { fname, pin, email } = emailObj;

    const link = `http://localhost:3000/email-verification?pin=${pin}&email=${email}`;
    const obj = {
        ...emailObj,
        subject: 'Email Confirmation Required.',
        text: `Hi ${fname}, please follow the link below to confirm the email. ${link}`,
        html: `Hi ${fname}.
        <br/><br/>
        Please follow the link below to confirm your email.<br/><br/>
        <a href="${link}">${link}</a>
        Thank you.<br/><br/>
        Kind regards.
        --SWAPI SWAP--`,
    };

    emailProcessor(obj);
};
export const sendEmailVerificationConfirmation = (emailObj) => {
    const { fname } = emailObj;

    const obj = {
        ...emailObj,
        subject: 'Email Verification Confirmation.',
        text: `Hi ${fname}, Your email has been verified. You may login now.`,
        html: `Hi ${fname}.
        <br/><br/>
        Your email has been verified. You may login now.
        Thank you.<br/><br/>
        Kind regards.
        --SWAPI SWAP--`,
    };

    emailProcessor(obj);
};
