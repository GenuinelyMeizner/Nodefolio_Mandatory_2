import express from "express";
import path from "path";
import { createPage } from "./render.js";
import { contactRouter } from "./routers/contactRoute.js";
import { urlencoded } from "express";

const app = express();

const __dirname = path.resolve();

app.use(express.static("public"));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.json());
app.use(urlencoded({extended : true}));
app.use("/contact", contactRouter);

const frontpage = createPage("/frontpage.html");

app.get("/", (req, res) => {
    res.send(frontpage);
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log(`Server is running on port ${PORT}`);
});