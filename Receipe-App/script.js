const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");
getRandomMeal();
fetchFavMeals();
async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];
  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );

  const respData = await resp.json();
  const meal = respData.meals[0];
  return meal;
}

async function getMealBySearch(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );

  const respData = await resp.json();
  const meals = await respData.meals;
  return meals;
}

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");
  meal.innerHTML = `
      <div class="meal-header">
        ${random ? `<span class="random"> Random Recipe </span>` : ""}
        <img
          src="${mealData.strMealThumb}"
          alt="${mealData.strMeal}"
        />
      </div>
      <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn" onclick="">
          <i class="far fa-heart"></i>
        </button>
      </div>`;

  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealFromLocalStorage(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealToLocalStorage(mealData.idMeal);
      btn.classList.toggle("active");
    }

    
    fetchFavMeals();
  });
  mealsEl.appendChild(meal);
}

function addMealToLocalStorage(mealId) {
  const mealIds = getMealsFromLocalStorage();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealFromLocalStorage(mealId) {
  const mealIds = getMealsFromLocalStorage();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealsFromLocalStorage() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
  //clean the container
  favoriteContainer.innerHTML = '';
  const mealIds = getMealsFromLocalStorage();
  const meals = [];
  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    meal = await getMealById(mealId);
    addMealToFav(meal);
  }
}

function addMealToFav(mealData) {
  const favMeal = document.createElement("li");
  favMeal.innerHTML = `
  <img
    src="${mealData.strMealThumb}"
    alt="${mealData.strMeal}"
  /><span>${mealData.strMeal}</span>
  <button class="clear"><i class="fas fa-window-close"></i></button>`;

  const btn = favMeal.querySelector('.clear');
  btn.addEventListener('click', () => {
    removeMealFromLocalStorage(mealData.idMeal);
    fetchFavMeals();
  });
  
  favoriteContainer.appendChild(favMeal);
}

searchBtn.addEventListener('click', async () => {
  // clean container
  mealsEl.innerHTML = '';
  const search = searchTerm.value;
  const meals = await getMealBySearch(search);
  if (meals) {
    meals.forEach(meal => {
      addMeal(meal);
    });
  }
});