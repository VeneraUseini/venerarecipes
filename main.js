//  const searchForm = document.querySelector('form');
//  const searchResultDiv = document.querySelector('.search-result');
//  const container = document.querySelector('.container');
//  let searchQuery = '';
//  const APP_ID ='1b1c72ce';
//  const APP_key ='8076300a298f5eab9f5b4106fa4695d0';

//  searchForm.addEventListener('submit', (e)=>{
//      e.preventDefault();
//      searchQuery = e.target.querySelector('input').value;
//      fetchAPI();
//  });

//  async function fetchAPI (){
//     const baseURL = `https://venerarecipes.herokuapp.com/api/v1/search/${searchQuery}`;
//     const response = await fetch(baseURL);
//     const data = await response.json();
//     generateHTML(data);
//     console.log(data);
//  }
//  function generateHTML(results){
//      container.classList.remove('initial');
//      let generatedHTML = '';
//         results.map(result => {
//             generatedHTML +=
//                 `
//                 <div class="item">
//                     <img src="${result.photo_url}" alt="">
//                     <div class="flex-container">
//                         <h1 class="title"> ${result.recipeName}</h1>
//                         <a class="view-button" href="" target="_blank">View Recipe</a>
//                     </div>
//                     <p class="item-data">Calories: ${result.callories.toFixed(2)}</p>
//                     <p class="item-data">Diet Label: </p>
//                     <p class="item-data">Health Label: </p>
//                 </div>
//                 `

//         })
//      searchResultDiv.innerHTML = generatedHTML;
//  }

const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://venerarecipes.herokuapp.com/api/v1/search/${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data){
            data.forEach(meal => {
                html += `
                    <div class = "meal-item" data-parent="${meal.recipeName}">
                        <div class="meal-img">
                            <img src="${meal.photo_url}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.recipeName}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;
    });
}

// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://venerarecipes.herokuapp.com/api/v1/search/${mealItem.dataset.parent}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data));
    }
}

// create a modal
function mealRecipeModal(meal){
    meal = meal[0];
    let html = `
        <h2 class="recipe-title">${meal.recipeName}</h2>
        <p class="recipe-category">${meal.categoryId.categoryName}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.callories}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.photo_url}" alt="">
        </div>
        <div class="recipe-link">
            <a href="${meal.photo_url}" target="_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
