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
  dateHeader.textContent = `${day}, v${week}`
}


async function fetchDishes() {

  try {
    let db = await fetch("https://projekt-backend-s1gd.onrender.com/index")
    let result = await db.json()

    const lunchmenu = document.getElementById("lunchmenu")
    lunchmenu.innerHTML = ""

    result.forEach(dish => {

      const indexDish = document.createElement("div")
      indexDish.setAttribute("class", "indexDish")

      let dishName = document.createElement("h3")
      let dishIngr = document.createElement("p")
      let dishAlrgs = document.createElement("p")

      dishName.textContent = dish.dishname
      dishIngr.textContent = dish.ingredients
      dishAlrgs.textContent = `Allergener: ${dish.allergens}`


      indexDish.appendChild(dishName)
      if (dish.image) {
        const imageUrl = `https://projekt-backend-s1gd.onrender.com/uploads/${dish.image}`;
        let dishImage = document.createElement("div")
        dishImage.setAttribute("class", "dishImage")
        dishImage.innerHTML = `<img src="${imageUrl}" alt="${dish.dishname}">`;
        indexDish.appendChild(dishImage)
      }
      indexDish.appendChild(dishIngr)
      indexDish.appendChild(dishAlrgs)


      if (dish.diet) {
        let dishDiet = document.createElement("p")
        dishDiet.textContent = dish.diet
        indexDish.appendChild(dishDiet)
      }

      lunchmenu.appendChild(indexDish)
    })

  } catch (err) {
    console.log(err)
  }
}