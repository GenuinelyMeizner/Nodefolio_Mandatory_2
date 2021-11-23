import fs from "fs";

const nav = fs.readFileSync("./public/nav.html", "utf-8");
const footer = fs.readFileSync("./public/footer.html", "utf-8");

function createPage(path, options) {
    return (nav + fs.readFileSync(`./public/${path}`) + footer);
}

export { createPage };