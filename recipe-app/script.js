const meals = document.getElementById('meals');
const ulcontainer = document.getElementById('recipe-stories-ul');
const searchButton = document.getElementById('search-button'); 
const searchTerm = document.getElementById('search-term');

searchButton.addEventListener('click', async()=>{
    meals.innerHTML = '';
    const search = searchTerm.value;
    const searchResults = await searchRecipe(search);
    if (searchResults){
        searchResults.forEach(meal=>{
        addMeal(meal);
    })}

});
getRandomRecipe();
fetchFavMeals();
function addfavourite(mealId){
    const mealIds = getFavouriteFromLS();
    //get all favourites and add the new one appended to it
    localStorage.setItem('mealIds',JSON.stringify([...mealIds, mealId]));    
}
function getFavouriteFromLS(){
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    console.log(mealIds);
    console.log("getFavouriteFromLS");
    return mealIds === null? []: mealIds;
}
function removeMealFromLS(mealId){
    const mealIds = getFavouriteFromLS();
    //get all favourites and add the new one appended to it
    console.log("favourites"+mealIds);
    localStorage.setItem('mealIds',
    JSON.stringify(mealIds.filter(id=>id!==mealId)));    
}
function addMeal(mealData,random=false){
    const meal = document.createElement('div');
    meal.classList.add('recipe-card');
    meal.innerHTML=`            
            <div class="recipe-header">
            ${random? `<span class="recipe-tag">Random Recipe</span>`:''}                
                <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
            </div>
            <div class="recipe-body">
                <h2>${mealData.strMeal}</h2>
                <button class="like-button">
                <img class="like-button-img" src="heart.svg">
                </button>
                
            </div>        
        `;
    meals.appendChild(meal);
    const button = document.querySelector('.recipe-body .like-button');
    button.addEventListener("click",()=>{
        if (button.classList.contains("active")){
            removeMealFromLS(mealData.idMeal);
            button.classList.remove("active");
        }else{
            addfavourite(mealData.idMeal);
            button.classList.add("active");
        }
        ulcontainer.innerHTML = '';
        fetchFavMeals();    
        
    });

}
async function getRandomRecipe(){
    const response =  await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const meal = await response.json();
    
    const mealData = meal.meals[0];
    // const mealid = meal['meals'][0]['idMeal'];
    // const mealName = meal['meals'][0]['strMeal'];
    addMeal(mealData, true);
}
async function getRecipeById(id){
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
    const respData = await response.json();
    const meal = respData.meals[0];
    return meal;
}
async function searchRecipe(text){
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+text);
    const respData = await response.json();
    const meals = await respData.meals;
    return meals;
}

async function fetchFavMeals(){
    ulcontainer.innerHTML = '';
    const mealIds =getFavouriteFromLS();
    console.log(mealIds);

    for (let i=0;i<mealIds.length;i++){        
        meal = await getRecipeById(mealIds[i]);
        addToStories(meal);
    }
}
function addToStories(mealData){
    
    const lielement = document.createElement('li')
    lielement.classList.add('recipes');
    lielement.innerHTML = `        
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">                    
        <span>${mealData.strMeal}</span>
        <button class="close-button">X</button>
        </li>`; 
    
    const button = lielement.querySelector('.close-button');
    button.addEventListener('click',()=>{
        
        removeMealFromLS(mealData.idMeal);
        fetchFavMeals();
    })
    ulcontainer.appendChild(lielement);
}