fetch("/projects/api/projects")
    .then(response => response.json())
    .then(({ allProjects }) => {
        const projectsWrapper = document.getElementById("projects-wrapper");
        allProjects.map(project => {
            const projectDiv = document.createElement("div");
            projectDiv.setAttribute("class", "project");
            projectDiv.innerHTML = 
            `
            <h6>${project["title"]}</h6>
            <hr>
            <p>Technologies: ${project["technologies"]}</p>
            <p>Description: ${project["description"]}</p>
            <a href="${project["githublink"]}">GitHub Link</a>
            <hr>
            `;
            projectsWrapper.appendChild(projectDiv);
        })
    })