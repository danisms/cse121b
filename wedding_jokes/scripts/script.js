/*
<!-- Conversation Block -->
<div class="block left-block" id="block-1">
    <img src="images/image_1.jpg" id="image_1" alt="a couple photo" class="couple-photo left-couple-photo">
    <p class="chat left-chat" id="chat-1">
        
    </p>
</div>
*/

/* 
<div id="conversation-intro">
    <div id="couple-name-box"><h1>Conversation Between Mr & Mrs <span id="couple-name-intro">Couple's-Name</span></h1></div>
    <div id="conversation-set">
        <p id="set-paragraph">
            Hello! what are you saying! are you listening to me or not, I believe you are.
            Thanks for doing so.
        </p>
    </div>
</div>
*/

// Import JSON FILE
// import values from "./marriage_jokes.json" assert {type: 'json'};

fetch("./scripts/marriage_jokes.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);  // for testing purpose
        mainBtn.addEventListener('click', () => {
            main(data.jokes);
        });
    })
    .catch(error => console.error("Error loading JSON: ", error));
// console.log(values)

// CREATE GLOBAL VARIABLES
let pickedRandom = [];  // Hold all selected random number to avoid duplicates.
let discussion = 0;  // stores the current discussion
let coupleName = prompt('Enter The Couple Name.');
// Get HTML Elements
const mainBtn = document.querySelector('button');
// blocks
// const block_1 = document.querySelector('#block-1');
// const block_2 = document.querySelector('#block-2');
// const block_3 = document.querySelector('#block-3');
// const block_4 = document.querySelector('#block-4');

//Conversation intro
const conversationIntroBlock = document.querySelector('#conversation-intro');
const coupleNameBox = document.querySelector('#couple-name-box');
const coupleNameIntro = document.querySelector('#couple-name-intro');
const conversationSetBlock = document.querySelector('#conversation-set');
const setParagraph = document.querySelector('#set-paragraph');
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
let pathImg_1 = '';
let pathImg_2 = '';

// image list
let maleImg = ['images/image_1.jpg', 'images/image_11.jpg'];
let femaleImg = ['images/image_2.jpeg', 'images/image_22.png'];
// store current img displayed
let currentImg = '';

// all element array
const allElements = [image_1, image_2, image_3, image_4, chatBox_1, chatBox_2, chatBox_3, chatBox_4, conversationIntroBlock, coupleNameBox, conversationSetBlock, setParagraph];


// FUNCTIONS
function main(jokes) {
    /* main function to run the program */
    console.log("Jokes", jokes);  // for testing purpose

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
            case 0:
                console.log('Introduction');
                // select and image from image list
                pathImg_1 = maleImg[getRandomNum(maleImg.length)];
                pathImg_2 = femaleImg[getRandomNum(femaleImg.length)];
                // display intro
                conversationIntroBlock.style.display = 'block';
                coupleNameBox.style.display = 'block';
                coupleNameIntro.innerHTML = coupleName;
                setTimeout(() => {
                    conversationSetBlock.style.display = 'block';
                    displayChat(setParagraph, selectedJoke.set, 1000, 60, 6000);
                }, 2000);
                ++discussion;
                break
            case 1:
                console.log('Discussion 1');
                // clear conversation frame.
                conversationIntroBlock.style.display = 'none';
                // display picture
                displayJoke(selectedJoke, image_1, 'display-left-photo');
                displayChat(chatBox_1, selectedJoke.first, 900, 60, 1000);
                ++discussion;
                break
            case 2:
                console.log('Discussion 2');
                // display picture
                displayJoke(selectedJoke, image_2, 'display-right-photo');
                displayChat(chatBox_2, selectedJoke.second, 900, 60, 1000);
                ++discussion;
                break
            case 3:
                console.log('Discussion 3');
                // display picture
                displayJoke(selectedJoke, image_3, 'display-left-photo');
                displayChat(chatBox_3, selectedJoke.third, 900, 60, 1000);
                ++discussion;
                break
            case 4:
                console.log('Discussion 4');
                // display picture
                displayJoke(selectedJoke, image_4, 'display-right-photo');
                displayChat(chatBox_4, selectedJoke.fourth, 900, 60, 1000);
                ++discussion;
                // discussion = 1;
                break
            default:
                discussion = 0;
                mainBtn.disabled = false;
                // hide all elements
                setTimeout(() => {
                    hideElements(allElements);
                }, 60000);
        };
    };
    

    // IMPORTANT FUNCTIONS
    function displayImg(element, imgPath, animationName){
        element.src = imgPath;
        element.style.display = 'inline-block';
        element.style.animationName = animationName;
        element.style.animationDuration = '1s';
    };
    
    function displayChat(element, text, delayTime, speed, delayFunctionCall){
        setTimeout(() => {
            element.style.display = 'inline-block';
            element.innerHTML = textByLetter(text, element, speed, delayFunctionCall);
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
    function textByLetter(text, refValue, speed, delayFunctionCall) {
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
                    }, delayFunctionCall);
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
