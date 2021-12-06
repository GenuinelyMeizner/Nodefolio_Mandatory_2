import express from "express";
import { transporter } from "../nodemailer/nodemailer.js";
import { createPage } from "../render.js";

const contactRoute = express.Router();

const contactPage = createPage("contact.html");

contactRoute.get("/", (req, res) => {
    res.send(contactPage)
});

contactRoute.post("/api/email", (req, res) => {
    const mailOptions = {
        from: req.body.email,
        to: "jacey.cole83@ethereal.email",
        subject: req.body.subject,
        text: req.body.content
    };
    transporter.sendMail(mailOptions);
    return res.status(200).send();
});

export {contactRoute};