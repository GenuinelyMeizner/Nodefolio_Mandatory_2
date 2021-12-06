import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jacey.cole83@ethereal.email',
        pass: 'hsgr7yUBdrgKkuzGAY'
    }
});

export { transporter };