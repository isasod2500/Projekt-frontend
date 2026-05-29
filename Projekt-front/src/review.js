document.addEventListener("DOMContentLoaded", () => {

    const reviewBtn = document.getElementById("reviewBtn")
    reviewBtn.addEventListener("click", sendReview)
    const menuBtn = document.getElementById("menuBtn")
    const navLinks = document.getElementById("navLinks")

    //Mobilemenu
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open")
    })
})


async function sendReview(event) {
    event.preventDefault()
    const errors = []
    errors.length = 0;
    const errorList = document.getElementById("errorList")
    errorList.innerHTML = "";


    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let rating = document.getElementById("rating").value
    let message = document.getElementById("reviewMsg").value
    let allowAnswer = document.getElementById("checkBox").checked


    if (!name.trim() || !email.trim() || !rating.trim()) {
        errors.push(`Samtliga fält måste fyllas i`)
    }


    if (errors.length > 0) {
        errors.forEach(error => {
            let errorLine = document.createElement("li")
            errorLine.innerHTML = error

            errorList.appendChild(errorLine)

        })
        return;
    }

    let formData = {
        name: name,
        email: email,
        rating: rating,
        message: message,
        allowAnswer: allowAnswer
    }

    try {
        let db = await fetch("http://127.0.0.1:3000/review", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const result = await db.json()

        if (!db.ok) {
            result.errors.forEach(error => {
                let errorLine = document.createElement("li")
                errorLine.innerHTML = error
                errorList.appendChild(errorLine)

            });
            return;
        }

        if (db.ok) {
            document.getElementById("reviewForm").reset();
            document.getElementById("success").textContent = "Recension skickad, tack!";
        }

    } catch (err) {
        console.log(err)
    }

}