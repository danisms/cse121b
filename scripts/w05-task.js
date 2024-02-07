/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.querySelector('#temples');
let templeList = [];
let temperaTempleList = [];

/* async displayTemples Function */
const displayTemples = (temples) => {
    temples.forEach(temple => {
        let articleElement = document.createElement('article');
        let h3Element = document.createElement('h3');
        h3Element.textContent = temple.templeName;
        let imgElement = document.createElement('img');
        imgElement.src = temple.imageUrl;
        imgElement.alt = temple.location;
        articleElement.appendChild(h3Element);
        articleElement.appendChild(imgElement);
        templesElement.appendChild(articleElement);
    });
}

/* async getTemples Function using fetch()*/
const getTemples = async () => {
    const response = await fetch('https://byui-cse.github.io/cse121b-ww-course/resources/temples.json')
    if (response.ok) {
        let data = await response.json();
        templeList = data;
        console.log(templeList)  // for testing purpose
        displayTemples(templeList)
    }
}

/* reset Function */
const reset = () => {
    templesElement.innerHTML = '';
}

/* filterTemples Function */
const sortBy = (temples) => {
    reset();
    let filter = document.querySelector('#filtered').value;
    console.log (filter)
    let filterFunction = (items, filterValue, valueIn=true) => {
        let filteredValue = items.filter((value) => {
            let locations = value.location.toLowerCase();
            if (valueIn){
                return locations.search(filterValue.toLowerCase()) != -1;
            }else {
                return locations.search('utah'.toLowerCase()) === -1;
            }
        });
        temperaTempleList = filteredValue;
        console.log(temperaTempleList);  // for testing purpose;
        displayTemples(temperaTempleList);
    }
    switch(filter) {
        case 'utah':
            filterFunction(temples, filter)
            break;
        case 'notutah':
            filterFunction(temples, filter, false)
            break;
        case 'older':
            let filteredValue = temples.filter((value) => {
                let dedicationDate = value.dedicated;
                // console.log(dedicationDate);
                newDedicatedDate = new Date(dedicationDate)
                console.log(newDedicatedDate)
                let sortDate = new Date(1950, 0, 1);
                // console.log(sortDate)
                return newDedicatedDate < sortDate;
            });
            temperaTempleList = filteredValue;
            console.log(temperaTempleList)
            displayTemples(temperaTempleList)
            break;
        case 'nameSort':
            console.log(temperaTempleList)
            if (temperaTempleList.length > 0){
                sortAlphabeticallyByName(temperaTempleList);
                displayTemples(temperaTempleList);
            }else{
                console.log('List is Empty!')
                temperaTempleList = temples.slice();  // for coping the list instead of referencing.
                sortAlphabeticallyByName(temperaTempleList);
                displayTemples(temperaTempleList);
            }
            break;
        case 'byDate':
            if (temperaTempleList.length > 0) {
                sortByDate(temperaTempleList);
                displayTemples(temperaTempleList);
            }else{
                temperaTempleList = temples.slice();
                sortByDate(temperaTempleList);
                displayTemples(temperaTempleList);
            }
            break;
        default:
            temperaTempleList = temples.slice();
            displayTemples(temperaTempleList);
    };
    console.log(temperaTempleList);  // for testing purpose
}

getTemples();

/* Event Listener */
filtered = document.querySelector('#filtered')
filtered.addEventListener('change', () => {sortBy(templeList)});

/* Stretch Sort By Name Alphabetically */
function sortAlphabeticallyByName(items) {
    sortedByName = items.sort((a, b) => {
        if (a.templeName > b.templeName) {
            return 1;
        }else if (a.templeName < b.templeName) {
            return -1;
        }else{
            return NaN;
        };
    });
}

function sortByDate(items) {
    items.sort((a, b) => {
        if (new Date(a.dedicated) > new Date(b.dedicated)) {
            return 1;
        }else if (new Date(a.dedicated) < new Date(b.dedicated)){
            return -1;
        }else {
            return NaN;
        }
    })
}

