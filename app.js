import express from "express";
import path from "path";
import session from "express-session";
import { urlencoded } from "express";
import { createPage } from "./render.js";
import { projectsRoute } from "./routers/projectsRouter.js";
import { contactRoute } from "./routers/contactRouter.js";
import { loginRoute } from "./routers/loginRouter.js";
import { adminRoute } from "./routers/adminRouter.js";

const app = express();

const __dirname = path.resolve();

app.use(express.static("public"));
app.use("/js", express.static(__dirname + '/node_modules/jquery/dist'));
app.use("/js", express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use("/build", express.static(__dirname + '/node_modules/toastr/build/'));
app.use("/css", express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.json());
app.use(urlencoded({extended : true}));
app.use(session({
    secret: 'uhh',
    resave: false,
    saveUninitialized: false
}));
app.use("/projects", projectsRoute);
app.use("/contact", contactRoute);
app.use("/login", loginRoute);
app.use("/admin", adminRoute);

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