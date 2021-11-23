import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'vincenzo.shields13@ethereal.email',
        pass: 'pMCMEvXNF4a7517shG'
    }
});

export { transporter };