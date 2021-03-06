function sendEmail() {
    fetch("/contact/api/email", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
            email: document.getElementById("yourEmail").value,
            subject: document.getElementById("yourSubject").value,
            content: document.getElementById("yourContent").value
        })
    }).then(response => {
        if (response.status === 200) {
            toastr["success"]("E-mail Sent");
        }
    })
}

document.getElementById("buttonSendEmail").addEventListener("click", sendEmail);

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