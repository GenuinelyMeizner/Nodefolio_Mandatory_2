import express from "express";
import { createPage } from "../render.js";
import { connection } from "../database/connection.js";

const projectsRoute = express.Router();

const projectsPage  = createPage("projects.html");

projectsRoute.get("/", (req, res) => {
    res.send(projectsPage);
});

projectsRoute.get("/api/projects", async (req, res) => {
    const allProjects = await connection.all("SELECT * FROM projects");
    res.send({allProjects});
})

export { projectsRoute }

