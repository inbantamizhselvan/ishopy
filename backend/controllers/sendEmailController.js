import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS, 
        pass: process.env.PASSWORD, 
    },
});

export const sendEmailToSubscribers = async ({email, subject, emailMessage, emailHTML}) => {
    try {
        const mailOptions = {
            from: '"IShopY" <contact.ishopy@gmail.com>', 
            to: email, 
            subject: subject,
            text: emailMessage, 
            html: emailHTML,
        };
            await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
