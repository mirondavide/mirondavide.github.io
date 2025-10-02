function sendEmail() {
    const form = document.querySelector('form');
    
    // Verifica se il modulo è valido (i campi richiesti sono compilati)
    if (!form.checkValidity()) {
        alert("Per favore, completa tutti i campi obbligatori.");
        return; // Se non è valido, fermati e non inviare
    }

    const templateParams = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        subject: document.querySelector("#subject").value,
        message: document.querySelector("#message").value,
    };

    // Invia l'email tramite EmailJS
    emailjs.send("service_wxfuxdr", "template_ftd2qrb", templateParams)
    .then(() => {
        alert("Email inviata con successo!");
    })
    .catch((error) => {
        console.error("Errore nell'invio dell'email:", error);
        alert("Impossibile inviare l'email. Riprova più tardi.");
    });
}
