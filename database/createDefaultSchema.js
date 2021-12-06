import { createConnection } from "./connection.js";
import { hashedpassword } from "../encrypt.js";

(async () => {
    const connect = await createConnection();

    await connect.exec("DROP TABLE IF EXISTS admins");
    await connect.exec("DROP TABLE IF EXISTS projects");
    

    const adminsSchema = 
        `CREATE TABLE admins(
            admin_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL
        )`;

    const projectsSchema = 
    `CREATE TABLE projects(
        project_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        technologies TEXT NOT NULL,
        description TEXT,
        githublink TEXT NOT NULL
    )`;

    const addAdmin = `INSERT INTO admins(username, password) VALUES ('admin', '${hashedpassword}')`;

    const addProjects = `INSERT INTO projects (title, technologies, description, githublink)
    VALUES
    ('Weather Exam Project', 'Java, HTML, Javascript', 'Application for monitoring weather station data', 'https://github.com/GenuinelyMeizner/WeatherExamProject'),
    ('Camptoo Earnings Calculator', 'Typescript, React, NodeJs', 'Remake of the earnings calculator made featured on www.camptoo.com', 'https://github.com/GenuinelyMeizner/Camptoo_Earnings_Calculator'),
    ('NodeJs Documentation Page', 'Javascript, NodeJs, Express', 'NodeJs Mandatory 1', 'https://github.com/GenuinelyMeizner/NODE_JS_MANDATORY_1');
    `;

    await connect.exec(adminsSchema);
    await connect.exec(projectsSchema);
    await connect.run(addAdmin);
    await connect.run(addProjects);
})()