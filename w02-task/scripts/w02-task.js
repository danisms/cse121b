/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
let fullName = 'Daniel C. Opute'.toLocaleUpperCase();
// console.log(fullName);  // for testing purpose

let currentYear = new Date().getFullYear();
console.log(currentYear);  // for testing purpose

let profilePicture = 'images/my_passport.png';  // get my profile picture

/* Step 3 - Element Variables */
const nameElement = document.getElementById('name');
const foodElement = document.getElementById('food');
let yearElement = document.querySelector('#year');
let imageElement = document.querySelector('img');

/* Step 4 - Adding Content */
nameElement.innerHTML = `<strong>${fullName}</strong>`;

// add current year content
yearElement.textContent = currentYear;

// add my profile picture
imageElement.src = profilePicture;
// imageElement.setAttribute('src', profilePicture)  // Alternate method
let setImageAlt = imageElement.setAttribute('alt', `Profile image of ${fullName}`);
console.log(setImageAlt);  // for testing purpose

/* Step 5 - Array */
let favoriteFood = ['Fried/Jellof Rice with Socked Tomato Stew Turkey', 'Eguis Soup and Moderate Soft Eba', 'Well Spiced Noddle', 'Oily Fried Eggs of Good Quantity, Covered with Toasted Soft Bread', 'Coked/Fried Yam with Meat and Cabbage Sauce'];
foodElement.innerHTML = favoriteFood;

let singleFavoriteFood = 'Crunchy Chicken and Chips';
favoriteFood.push(singleFavoriteFood);

foodElement.innerHTML += `<br>${favoriteFood}`;
// remove first element from favoriteFood Array
favoriteFood.shift();

foodElement.innerHTML += `<br>${favoriteFood}`;

//remove last element from favoriteFood Array
favoriteFood.pop();

foodElement.innerHTML += `<br>${favoriteFood}`;
