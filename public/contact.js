function sendEmail() {

    fetch("/contact/api/email", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
            email: document.getElementById("yourEmail").value,
            subject: document.getElementById("yourSubject").value,
            content: document.getElementById("yourContent").value
        })
    });
}

document.getElementById("buttonSendEmail").addEventListener("click", sendEmail);