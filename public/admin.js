fetch("/admin/api")
    .then(response => response.json())
    .then(({ allProjects }) => {
        const projectsWrapper = document.getElementById("projects-wrapper");

        allProjects.map(project => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add('project');
            projectDiv.id = project["project_id"];
            projectDiv.innerHTML = 
            `
            <h6>${project["title"]}</h6>
            <hr>
            <p>Technologies: ${project["technologies"]}</p>
            <p>Description: ${project["description"]}</p>
            <a href="${project["githublink"]}">GitHub Link</a>
            <div class="modal fade text-dark" id="update-project-${project["project_id"]}" tabindex="-1" aria-labelledby="update-project-label" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="updateproject-label">Update Project</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                                <div class="modal-body">
                                    <form>
                                        <div>
                                            <label for="patch-title" class="form-label">Project Title</label>
                                            <input type="text" class="form-control" id="patch-title" value="${project["title"]}">
                                        </div>
                                        <div>
                                            <label for="patch-tech" class="form-label">Technologies</label>
                                            <input type="text" class="form-control" id="patch-tech" value="${project["technologies"]}">
                                        </div>
                                        <div>
                                            <label for="patch-desc" class="form-label">Description</label>
                                            <input type="text" class="form-control" id="patch-desc" value="${project["description"]}">
                                        </div>
                                        <div>
                                            <label for=patch-link class="form-label">GitHub Link</label>
                                            <input type="text" class="form-control" id="patch-link" value="${project["githublink"]}">
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-primary" id="update-${project["project_id"]}">Update</button>
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                        </div>
                    </div>
                </div>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update-project-${project["project_id"]}">Update</button>
            <button type="button" id="delete-${project["project_id"]}" class="btn btn-danger">Delete</button>
            <hr>
            `;
            projectsWrapper.appendChild(projectDiv);

            document.getElementById("delete-" + project["project_id"])
            .onclick = async () => {
                deleteProject(project["project_id"], projectDiv);
            }

            document.getElementById("update-" + project["project_id"])
            .onclick = async () => {
                updateProject(project["project_id"]);
            }

        });
    });

document.getElementById("save-button").addEventListener("click", createProject);

function createProject() {
    fetch("/admin/api", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
            title: document.getElementById("title").value,
            technologies: document.getElementById("tech").value,
            description: document.getElementById("desc").value,
            githublink: document.getElementById("link").value
        })
    }).then(response => {
        if (response.status === 201) {
            toastr["success"]("Project Created");
            setTimeout(() => location.reload(), 1000);
        }
    })
}

function updateProject(projectId) {
    fetch(`/admin/api/${projectId}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            title: document.getElementById("patch-title").value,
            technologies: document.getElementById("patch-tech").value,
            description: document.getElementById("patch-desc").value,
            githublink: document.getElementById("patch-link").value
        })
    }).then(response => {
        if (response.status === 200) {
            toastr["success"]("Project Update");
            setTimeout(() => location.reload(), 1000);
        }
    });
};

const projectsWrapper = document.getElementById("projects-wrapper");

function deleteProject(projectId, projectDiv) {
    fetch(`/admin/api/${projectId}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(response => {
        if (response.status === 200) {
            toastr["success"]("Project Deleted");
            setTimeout(() => projectsWrapper.removeChild(projectDiv), 1000);
            
        }
    })
}

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "4000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}