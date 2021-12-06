function authenticate() {

    fetch("/login/api/loginInfo", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        })
    }).then(response => {

        if (response.status === 200) {
            toastr["success"]("Login Successful");
            setTimeout(() => location.href = "/admin", 1000);
        } else if (response.status === 401) {
            toastr["error"]("Check Credentials");
            setTimeout(() => location.href = "/login", 3000);
        }
    })
}

document.getElementById("formlogin").addEventListener("submit", e => {
    e.preventDefault();
    authenticate();
} );


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

