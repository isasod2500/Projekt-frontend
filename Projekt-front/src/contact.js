document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("contactSubmit").addEventListener("click", () => {
        sendContact()
    })
})

async function sendContact() {

    event.preventDefault()

    const regex = /[a-zA-Z]/
    let errorList = document.getElementById("errorList")
    const errors = []
    errors.length = 0
    errorList.innerHTML = ""

    let firstname = document.getElementById("firstname").value
    let surname = document.getElementById("surname").value
    let email = document.getElementById("email").value
    let phone = document.getElementById("phone").value
    let message = document.getElementById("message").value

    if (firstname === "") {
        errors.push(`Förnamn måste fyllas i`)
    }
    if (surname === "") {
        errors.push(`Efternamn måste fyllas i`)
    }
    if (phone === "" && email === "") {
        errors.push(`Ett av kontaktfälten måste fyllas i`)
    }
    if (regex.test(phone)) {
        errors.push(`Felaktigt format i telefonnumret.`)
    }
    if (!email.includes("@")) {
        errors.push(`Felaktigt format på e-post`)
    }
    if (message === "") {
        errors.push(`Meddelande måste fyllas i.`)
    }

    try {
        let db = await fetch("http://127.0.0.1:3000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstname: firstname,
                surname: surname,
                email: email,
                phone: phone,
                message: message,
            })
        })

        const result = await db.json();

        if (!db.ok) {
            result.errors.forEach(error => {
                let errorLine = document.createElement("li")
                errorLine.innerHTML = error
                errorList.appendChild(errorLine)

            });
            return;
        }
        document.getElementById("success").innerHTML = `Meddelande skickat!`
        document.getElementById("contactForm").reset();
    } catch (err) {
        console.log(err)
    }


}