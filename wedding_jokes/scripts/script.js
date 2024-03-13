/*
<!-- Conversation Block -->
<div class="block left-block" id="block-1">
    <img src="images/image_1.jpg" id="image_1" alt="a couple photo" class="couple-photo left-couple-photo">
    <p class="chat left-chat" id="chat-1">
        
    </p>
</div>
*/

// Import JSON FILE
import values from "./marriage_jokes.json" assert {type: 'json'};
// console.log(values)

// CREATE GLOBAL VARIABLES
const jokes = values.jokes;  // stores an object list of all jokes
let pickedRandom = [];  // Hold all selected random number to avoid duplicates.
let discussion = 1;  // stores the current discussion
// Get HTML Elements
const mainBtn = document.querySelector('button');
// blocks
// const block_1 = document.querySelector('#block-1');
// const block_2 = document.querySelector('#block-2');
// const block_3 = document.querySelector('#block-3');
// const block_4 = document.querySelector('#block-4');
// image Elements
const image_1 = document.querySelector('#image_1');
const image_2 = document.querySelector('#image_2');
const image_3 = document.querySelector('#image_3');
const image_4 = document.querySelector('#image_4');
// paragraphs(chat-box)
const chatBox_1 = document.querySelector('#chat-1');
const chatBox_2 = document.querySelector('#chat-2');
const chatBox_3 = document.querySelector('#chat-3');
const chatBox_4 = document.querySelector('#chat-4');

// image paths
const pathImg_1 = 'images/image_1.jpg';
const pathImg_2 = 'images/image_2.png';
// store current img displayed
let currentImg = '';

// all element array
const allElements = [image_1, image_2, image_3, image_4, chatBox_1, chatBox_2, chatBox_3, chatBox_4];


// FUNCTIONS
function main() {
    /* main function to run the program */

    // disable button
    mainBtn.disabled = true;

    // hide all elements
    hideElements(allElements);

    // get a unique random number for array use
    let uniqueRandomNum = '';
    uniqueRandomNum = getRandomNum(jokes.length);
    // console.log(uniqueRandomNum);
    while(pickedRandom.includes(uniqueRandomNum)){
        uniqueRandomNum = getRandomNum(jokes.length);
    }
    pickedRandom.push(uniqueRandomNum);
    console.log(`Random Number Picked: ${pickedRandom}`);  // for testing purpose

    // use uniqueRandomNum to call pick an array from jokes
    let selectedJoke = jokes[uniqueRandomNum];
    console.log(`Selected Joke: ${selectedJoke}`);

    function checkDiscussion() {
        // use switch to display chat accordingly
        switch(discussion){
            case 1:
                console.log('Discussion 1');
                // display picture
                displayJoke(selectedJoke, image_1, 'display-left-photo');
                displayChat(chatBox_1, selectedJoke.first, 900)
                ++discussion;
                break
            case 2:
                console.log('Discussion 2');
                // display picture
                displayJoke(selectedJoke, image_2, 'display-right-photo');
                displayChat(chatBox_2, selectedJoke.second, 900);
                ++discussion;
                break
            case 3:
                console.log('Discussion 3');
                // display picture
                displayJoke(selectedJoke, image_3, 'display-left-photo');
                displayChat(chatBox_3, selectedJoke.third, 900);
                ++discussion;
                break
            case 4:
                console.log('Discussion 4');
                // display picture
                displayJoke(selectedJoke, image_4, 'display-right-photo');
                displayChat(chatBox_4, selectedJoke.fourth, 900);
                ++discussion;
                // discussion = 1;
                break
            default:
                discussion = 1;
                mainBtn.disabled = false;
        };
    };
    

    // IMPORTANT FUNCTIONS
    function displayImg(element, imgPath, animationName){
        element.src = imgPath;
        element.style.display = 'inline-block';
        element.style.animationName = animationName;
        element.style.animationDuration = '1s';
    };
    
    function displayChat(element, text, delayTime){
        setTimeout(() => {
            element.style.display = 'inline-block';
            element.innerHTML = textByLetter(text, element, 50);
        }, delayTime);
    };

    function displayJoke(jokeObj, element, animationName){
        if (jokeObj.start == 'male' && discussion <= 1) {
            currentImg = pathImg_1;
            displayImg(element, currentImg, animationName);
        }else if (jokeObj.start == 'female' && discussion <= 1) {
            currentImg = pathImg_2;
            displayImg(element, currentImg, animationName);
        }else{
            // pass
        };

        if (discussion > 1){
            if (currentImg == pathImg_1){
                currentImg = pathImg_2;
                displayImg(element, currentImg, animationName);
            }else{
                currentImg = pathImg_1;
                displayImg(element, currentImg, animationName);
            };
        };
    };

    function hideElements(elements){
        elements.forEach((element) => {
            element.style.display = 'none';
        });
    };

    // Display text by latter
    function textByLetter(text, refValue, speed) {
        let textList = text.split('');
        let indexNum = 0;
        let displayText = '';
        // Disable all buttons
        const allBtn = document.querySelectorAll('button')
        allBtn.forEach((button)=>{
            // button.disabled = true;
        });
        console.log(textList)
        console.log(textList.length)
        function writeText() {
            let textValue = textList[indexNum];
            displayText += textValue;
            refValue.innerHTML = displayText;
            indexNum++;
            if (indexNum >= textList.length) {
                clearInterval(writing)
                allBtn.forEach((button)=>{
                    // button.disabled = false;
                    setTimeout(() => {
                        checkDiscussion();
                    }, 1000);
                });
            };
        };
        let writing = setInterval(() => {
            writeText();
        }, speed);
    };
    setTimeout(() => {
        checkDiscussion();
    }, 2000);
}

mainBtn.addEventListener('click', main);

// function to get random number between the MaxNumber given as argument.
function getRandomNum(MaxNum){
    return Math.floor(Math.random() * MaxNum);
};

// // disable all button in the array supplied to the function
// function disableButtons(arrayValue){
//     arrayValue.forEach(key =>{
//         document.getElementById(key).setAttribute('disabled', true);
//     });
// };

// // enable all button in the array supplied to the function
// function enableButtons(arrayValue){
//     arrayValue.forEach(key =>{
//         document.getElementById(key).removeAttribute('disabled');
//     })
// };

// It Took Approximately 12hours to create, including the JSON file.
