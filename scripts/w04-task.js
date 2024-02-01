/* LESSON 3 - Programming Tasks */

/* Profile Object  */
let myProfile = {
    name: 'Daniel Opute',
    photo: 'images/my_passport.png',
    favoriteFoods: [
        'Fried/Jellof Rice with Socked Tomato Stew Turkey', 
        'Eguis Soup and Moderate Soft Eba', 
        'Well Spiced Noddle', 
        'Oily Fried Eggs of Good Quantity, Covered with Toasted Soft Bread', 
        'Coked/Fried Yam with Meat and Cabbage Sauce'
    ],
    hobbies: [
        'Video Games',
        'Sci-fi Movies',
        'Listening to Music',
        'Playing Musical Instrument(Ukulele, Piano, Recorder)',
        'Dancing'
    ],
    placeLived: [],
};

/* Populate Profile Object with placesLive objects */
myProfile.placeLived.push({
    place: 'Benin City, Edo',
    length: '20 years',
},
{
    place: 'Owerri, Imo',
    length: '6 months',
},
{
    place: 'Mbaise, Imo',
    length: '3 Months'
},
{
    place: 'Abak, Akwa-Ibom',
    length: '6 months',
},
{
    place: 'Ikot-ekpene, Akwa-Ibom',
    length: '6 weeks',
},
{
    place: 'Okpualangwa, Abia',
    length: '9 months'
},
);

// console.log(myProfile.placeLived)

/* DOM Manipulation - Output */

/* Name */
document.querySelector('#name').textContent = myProfile.name;

/* Photo with attributes */
photo = document.querySelector('#photo');
photo.src = myProfile.photo;
photo.alt = myProfile.name;

/* Favorite Foods List*/
myProfile.favoriteFoods.forEach((value) => {
    liElement = document.createElement('li');
    liElement.textContent = value;
    // Append child element
    document.querySelector('#favorite-foods').appendChild(liElement);
});


/* Hobbies List */
myProfile.hobbies.forEach(hobby => {
    li = document.createElement('li');
    li.textContent = hobby;
    // Append child element
    document.querySelector('#hobbies').appendChild(li);
});

/* Places Lived DataList */
myProfile.placeLived.forEach(value => {
    dt = document.createElement('dt');
    dt.textContent = value.place;
    dd = document.createElement('dd');
    dd.textContent = value.length;
    // Append child element
    dl = document.querySelector('#places-lived');
    dl.appendChild(dt)
    dl.appendChild(dd)
});

