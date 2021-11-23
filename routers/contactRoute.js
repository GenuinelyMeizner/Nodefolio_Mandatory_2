import express from "express";
import { transporter } from "../nodemailer/nodemailer.js";
import { createPage } from "../render.js";

const contactRouter = express.Router();

const contactPage = createPage("contact.html");

contactRouter.get("/", (req, res) => {
    res.send(contactPage)
});

contactRouter.post("/api/email", (req, res) => {
    const mailOptions = {
        from: req.body.email,
        to: "vincenzo.shields13@ethereal.email",
        subject: req.body.subject,
        text: req.body.content
    };

    transporter.sendMail(mailOptions);
});

export {contactRouter};