import express from "express";
import bcrypt from "bcrypt";
import { createPage } from "../render.js";
import { hashedpassword } from "../encrypt.js";

const loginRoute = express.Router();

const loginPage = createPage("login.html");

loginRoute.get("/", (req, res) => {
    res.send(loginPage);
});

loginRoute.post("/api/loginInfo", async (req, res) => {

    const authenticated = await bcrypt.compare(req.body.password, hashedpassword);
    
    if (authenticated) {
        req.session.authenticated = true;
        req.session.user = {
            hashedpassword
        };
        return res.status(200).send();
    } else {
        return res.status(401).send();
    }
});

export { loginRoute };