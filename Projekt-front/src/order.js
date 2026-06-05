document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("orderBtn").addEventListener("click", sendOrder)
    const menuBtn = document.getElementById("menuBtn")
    const navLinks = document.getElementById("navLinks")

    //Mobilemenu
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open")
    })
    fetchFood()
})

//array för dishes som sedan läggs in i beställningen
const dishes = []

async function fetchFood() {

    let db = await fetch("http://127.0.0.1:3000/index")
    let result = await db.json()

    result.forEach(dish => {

        let dishSection = document.getElementById("dishSection")


        let dishBox = document.createElement("div")
        dishBox.setAttribute("class", "orderDish")

        let dishHeader = document.createElement("h3")
        dishHeader.setAttribute("class", "dishHeader")
        dishHeader.innerHTML = `${dish.dishname}`

        let dishAlrgs = document.createElement("h4")
        dishAlrgs.setAttribute("class", "dishAlrgs")
        dishAlrgs.innerHTML = `Allergener: ${dish.allergens}`

        let dishPrice = document.createElement("h4")
        dishPrice.setAttribute("class", "dishPrice")
        dishPrice.innerHTML = `${dish.price}kr`

        let dishImg = document.createElement("img")
        dishImg.setAttribute("class", "dishImg")

        let addDish = document.createElement("button")
        addDish.setAttribute("class", "addDish")
        addDish.setAttribute("data-id", dish._id)
        addDish.setAttribute("data-name", dish.dishname)
        addDish.setAttribute("data-price", dish.price)
        addDish.innerText = `Lägg till`

        addDish.addEventListener("click", addFood)

        dishBox.appendChild(dishHeader)
        if (dish.image) {
            let dishImage = document.createElement("div")
            dishImage.setAttribute("class", "dishImage")
            dishImage.innerHTML += `<img src="${dish.image}">`
            dishBox.appendChild(dishImage)
        }
        dishBox.appendChild(dishAlrgs)
        dishBox.appendChild(dishPrice)
        dishBox.appendChild(dishImg)
        dishBox.appendChild(addDish)
        dishSection.appendChild(dishBox)

    })

}

function addFood(event) {
    event.preventDefault()
    let orderBtn = event.target

    let dishId = orderBtn.dataset.id
    let dishName = orderBtn.dataset.name
    let dishPrice = orderBtn.dataset.price
    let quantity = 1

    for (let dish of dishes) {
        if (dish._id == dishId) {
            dish.quantity++
            showPreview()
            return;
        }
    }
    let dish = {
        _id: dishId,
        dishname: dishName,
        price: Number(dishPrice),
        quantity: quantity
    }

    dishes.push(dish)

    console.log(dishes)
    showPreview()
    return dishes;
}

function showPreview() {


    const preview = document.getElementById("orderPreview")
    preview.innerHTML = "";

    dishes.forEach(dish => {

        let previewDish = document.createElement("div")
        previewDish.setAttribute("class", "previewDish")

        let previewDishHeader = document.createElement("h4")
        previewDishHeader.innerHTML = dish.dishname

        let previewDishPrice = document.createElement("p")
        previewDishPrice.innerHTML = `${dish.price}kr`

        let previewDishQuantity = document.createElement("h5")
        previewDishQuantity.innerHTML = (`${dish.quantity}x`)

        let totalPrice = calculatePrice()

        previewDish.appendChild(previewDishHeader)
        previewDish.appendChild(previewDishPrice)
        previewDish.appendChild(previewDishQuantity)

        preview.appendChild(previewDish)
    });

    let previewDishTotalPrice = document.createElement("h3")
    previewDishTotalPrice.innerHTML = `Summa ${calculatePrice()} kr`

    preview.appendChild(previewDishTotalPrice)
}

function calculatePrice() {
    return dishes.reduce((sum, dish) => {
        return sum + Number(dish.price) * Number(dish.quantity)
    }, 0)
}
async function sendOrder(event) {
    event.preventDefault();

    const errors = []
    errors.length = 0;
    const errorList = document.getElementById("errorList")
    errorList.innerHTML = ""


    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let phone = document.getElementById("phone").value
    let pickup = document.getElementById("pickup").value
    let message = document.getElementById("specialMsg").value
    let totalPrice = calculatePrice()

    let formData = {
        name: name,
        email: email,
        phone: phone,
        dishes: dishes,
        totalPrice: totalPrice,
        message: message,
        pickup: pickup,
    }

    try {
        let db = await fetch("https://projekt-backend-s1gd.onrender.com/orders", {
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

        document.getElementById("orderForm").reset();

        document.getElementById("orderPreview").innerHTML = "";
        document.getElementById("orderPreview").innerHTML = `Beställning skickad!`
        dishes.length = 0;
    } catch (err) {
        console.log(err)
    }

}

