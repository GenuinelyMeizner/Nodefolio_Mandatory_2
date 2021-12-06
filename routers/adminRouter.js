import express from "express";
import { createPage } from "../render.js";
import { connection } from "../database/connection.js";

const adminRoute = express.Router();

const adminPage = createPage("admin.html");

adminRoute.get("/", (req, res) => {
    if(req.session.authenticated) {
        return res.send(adminPage);
    } else {
        return res.redirect("/login");
    }
});

adminRoute.get("/api", async (req, res) => {
    const allProjects = await connection.all("SELECT * FROM projects");
    res.send({allProjects});
});

adminRoute.post("/api", async (req, res) => {
    const project = req.body;

    await connection.run(
        `INSERT INTO projects ('title', 'technologies', 'description', 'githublink')
        VALUES (?, ?, ?, ?)`,
        [
            project.title,
            project.technologies,
            project.description,
            project.githublink
        ]);
        return res.status(201).send();
});

adminRoute.patch("/api/:id", async (req, res) => {
    connection.run(`UPDATE projects SET 
    title = '${req.body.title}',
    technologies = '${req.body.technologies}',
    description = '${req.body.description}',
    githublink = '${req.body.githublink}'
    WHERE project_id = ${req.params.id}
    `);
    return res.status(200).send();
});

adminRoute.delete("/api/:id", async (req, res) => {
    connection.run(`DELETE FROM projects WHERE project_id = ${req.params.id}`);
    res.status(200).send();
});

export { adminRoute };