"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn")
  const navLinks = document.getElementById("navLinks")

  //Mobilemenu
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open")
  })
  getDate()
  fetchDishes()
})
//Räknar ut vecka och dag, och visar det på förstasidan.
function getDate() {

  const d = new Date();
  let firstDay = new Date(d.getFullYear(), 0, 1);
  let today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  let dayOfYear = ((today - firstDay + 1) / 86400000);
  let week = Math.ceil(dayOfYear / 7);

  const days = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]
  let day = days[d.getDay()]
  

  let dateHeader = document.getElementById("dateHeader")
  dateHeader.innerHTML = `${day}, v${week}`
}


async function fetchDishes() {

  let db = await fetch("http://127.0.0.1:3000/index")
  let result = await db.json()

  const lunchmenu = document.getElementById("lunchmenu")

  result.forEach(dish => {

    const indexDish = document.createElement("div")
    indexDish.setAttribute("class", "indexDish")

    let dishName = document.createElement("h3")
    let dishIngr = document.createElement("p")
    let dishAlrgs = document.createElement("p")

    dishName.innerHTML = dish.dishname
    dishIngr.innerHTML = dish.ingredients
    dishAlrgs.innerHTML = `Allergener: ${dish.allergens}`


    indexDish.appendChild(dishName)
    indexDish.appendChild(dishIngr)
    indexDish.appendChild(dishAlrgs)


    if (dish.diet) {
      let dishDiet = document.createElement("p")
      dishDiet.innerHTML = dish.diet
      indexDish.appendChild(dishDiet)
    }

    lunchmenu.appendChild(indexDish)
  })



  console.log(result)
}