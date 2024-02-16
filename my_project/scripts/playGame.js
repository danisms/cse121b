let difficult = ''  // stores level of difficulty

// function to assign player level of difficulty to the difficult variable.
function selectDifficulty(value){
    difficult = value;
    document.querySelector('#selectDifficultyMenu').style.display = 'none';
    document.querySelector('#playGameMenu').style.display = 'block';
    console.log(`Game Difficulty: ${difficult}`)
};


// Get player Name
let playerName = ''
 
function getPlayerName() {
    let getName = document.getElementById('name');
    console.log(getName)
    playerName = getName.value;
    getName.value = '';
    // validate input
    console.log(`Name: ${playerName}`);  // for testing purpose
    if (playerName.trim() != '') {
        // console.log(playerName);  // for debugging purpose
        document.getElementById('playGameMenu').style.display = 'none';
        document.getElementById('inGame').style.display = 'block';
        displayPlayerName();
    }else{
        alert('Player Name Should not be empty');
    };
};

function backToIndex() {
    close();
    open('index.html');
};

// IN GAME
/* 
<main>
    <div id="gameBox">
        <button class="boxBtn" onclick="getButton('a')"></button>
    </div>
</main

<header>
    <div id="playerNameHolder" class="nameHolder">Null</div>
    <div id="playerScoreHolder" class="scoreHolder">0</div>
    <div id="pauseBtn">▷</div>
    <div id="computerNameHolder" class="nameHolder">Computer</div>
    <div id="computerScoreHolder" class="scoreHolder">0</div>
<header>
*/

// Display Player Name
function displayPlayerName() {
    let nameHolder = document.querySelector('#playerNameHolder');
    nameHolder.innerHTML = playerName.toUpperCase();
    console.log(`Player Name: ${playerName}`);
};

let currentButtonId = '';  // store current button clicked id
let currentButtonKey = '';  // current button clicked value
let currentValue = 'O'; // store current value
let currentPlayer = 'p';  // initial start first player is the user
let firstPlayer = 'p';  // Stores the first player

let gameObject = {};  // storing key progress of each game
// The key = button; value = displaying value of the button

// Array for comparison
const initAllKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];  // Don't change or reset;
let allKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
let availableKeys = [];

let foundWinner = false;
let winner = '';  // holds the winner
let winningButtons = []  // holds the buttons that cause the win

// keep records
let playerScore = 0;
let computerScore = 0;

let totalRounds = 0;  // incremented at check for win when there is a winner or not at the end of each round

// API URL
const adviceUrl = 'https://api.adviceslip.com/advice';
const inspiredQuoteUrl = 'https://api.quotable.io/quotes/random'
const jokeUrl = 'https://official-joke-api.appspot.com/random_joke';

// Get button value and use the value to update game
function getButton(value) {
    // Function to get values from button clicked
    // and call the playGame function
    currentButtonId = value; // assign current button id value
    currentButtonKey = value; // assign current button key
    playGame();
};

// main function for playing the game
function playGame() {
    // Function that holds the game functionality need to play the game
    console.log(`Current Button Key: ${currentButtonKey}`)  // for testing purpose
    console.log(`Current Button ID: ${currentButtonId}`)  // for testing purpose
    console.log('PlayGame was activated')  // for testing purpose
    assignAndDisplayValue(currentButtonId);
    gameProgress(gameObject);  // assign values to gameObject
    availableKeys = Object.keys(gameObject);  // updates available key Array
    disableButtons(availableKeys);  // disable the buttons that have been clicked;
    removeListValue(availableKeys, allKeys); // update allKeys values

    foundWinner = false; // returns a true or false
    
    if (checkForWin(gameObject)){
        foundWinner = true;
        // increment total round
        totalRounds += 1;
    }else{
        foundWinner = false;
    }; 
    
    if (foundWinner) {
        displayWinningButtons(winningButtons);
        disableButtons(allKeys);
        setTimeout(function(){
            calculateResult();
        }, 500);
    }else{
        console.log('FOUND WINNER IS FALSE')
        evaluateAndPlay(gameObject, foundWinner);
    }
};

// calculates results at every round
function calculateResult() {
    if (currentPlayer === 'c') {
        document.querySelector('#playerScoreHolder').innerHTML = ++playerScore;
        // use a joke api
        requestApi(jokeUrl, displayGameRewardJoke);
    }else{
        document.querySelector('#computerScoreHolder').innerHTML = ++computerScore;
        // use advice api
        requestApi(inspiredQuoteUrl, displayGameRewardAdvice);
    };
    // submit and update result

};

// Assign to global variable (current player) and display current button value
function assignAndDisplayValue(buttonId) {
    // Function to assign and display value to button

    // Check and assign current button a value and display the value
    let buttonVal = document.getElementById(buttonId); // get button element
    if (buttonVal.value === '') {
        // Check and change current value to be assigned to buttons
        if (currentValue.toLowerCase() == 'x') {
            currentValue = 'o';
        }else if (currentValue.toLocaleLowerCase() == 'o') {
            currentValue = 'x';
        }else {
            // Do nothing;
        };

        // change player
        if (currentPlayer === 'p') {
            currentPlayer = 'c'
        }else{
            currentPlayer = 'p'
        }
        console.log(`CurrentPlayer: ${currentPlayer}`)
        // Assign Button Value
        buttonVal.value = currentValue
        buttonVal.innerHTML = currentValue.toUpperCase();
    }else {
        // Do nothing;
    };
};

// add button clicked value to game object global variable
function gameProgress(object) {
    // store the button and value as an object literal
    object[currentButtonKey] = currentValue;
    console.log(object);  // for testing purpose
};

// remove value from global list variable. Btn clicked value list and all buttons value;
function removeListValue(incompleteList, completedList) {
    // compare two list values and remove the values in the 1st from the 2nd list;
    incompleteList.forEach((key) => {
        // console.log(`Return Key Search: ${completedList.indexOf(key)}`) // for debugging
        if (completedList.indexOf(key) != -1) {
            let getIndex = completedList.indexOf(key)
            // console.log(getIndex)
            completedList.splice(getIndex, 1)
        }else {
            // console.log(`key: ${key} not found in completedList`);  // for debugging
        }

    });
    console.log(`Remainder Values = ${completedList}`)
};

// computer check for when to play
function evaluateAndPlay(object, checkWin) {
    console.log(`Found Winner: ${checkWin}`);  // for testing purpose;
    if (checkWin == false && currentPlayer === 'c'){
        // Computer play game
        // check if all in box button is full before computer can play
        let objectKeyCount = Object.keys(object).length;
        console.log(`Object Keys: ${objectKeyCount}`);
        if (objectKeyCount >= 9) {
            setTimeout(() => {
                computerPlay(object);
                return true;
            }, 1050);
        }else {
            computerPlay(object);
            return true;
        }
    }else{
        return false;
    }
};

// computer make choices on what to play
function computerPlay(object) {
    // Computer choice
    console.log('COMPUTER: I will make a choice!');

    let playAttack = attack();
    console.log(`Attack Return = ${playAttack}`);
    let playDefense = ''
    if (playAttack != true){
        playDefense = defend();
        console.log(`Defense Return = ${playDefense}`);
    }else {
        // do nothing
    };
    if (playDefense != true) {
        strategicMove();
    };

    function pickRandom(){
        // get random numbers
        let randomNum = getRandomNum(9);
        console.log('Select Num: ' + randomNum);

        if (randomNum === 1) {
            return 'a';
        }else if (randomNum === 2) {
            return 'b';
        }else if (randomNum == 3) {
            return 'c';
        }else if (randomNum == 4) {
            return 'd';
        }else if (randomNum == 5) {
            return 'e';
        }else if (randomNum == 6) {
            return 'f';
        }else if (randomNum == 7) {
            return 'g';
        }else if (randomNum == 8) {
            return 'h';
        }else{
            return 'i'
        };
    };

    function pickRandomValue(arrayList) {
        let randomIndexNum = getRandomNum(arrayList.length - 1);
        let selectedValue = arrayList[randomIndexNum];
        console.log(`Selected Random Value = ${selectedValue}`)
        return selectedValue;
    };

    function checkDefenseOrAttack(value) {
        // console.log(`Just Checking: ${('c' in object)}`)  // for debugging purpose
        // check for all possible "A" defenses
        if (object.a === value && object.b === value && ('c' in object) === false) {
            getButton('c');
            return true;
        }else if (object.a === value && object.c === value && ('b' in object) == false) {
            getButton('b');
            return true;
        }else if (object.a === value && object.d === value && ('g' in object) == false) {
            getButton('g');
            return true;
        }else if (object.a === value && object.g === value && ('d' in object) == false) {
            getButton('d');
            return true;
        }else if (object.a === value && object.e === value && ('i' in object) == false) {
            getButton('i');
            return true;
        }
        else if (object.a === value && object.i === value && ('e' in object) == false) {
            getButton('e');
            return true;
        }
        else{
            // do nothing
        }

        // check for all possible "B" defenses
        if (object.b === value && object.c === value && ('a' in object) === false) {
            getButton('a');
            return true;
        }else if (object.b === value && object.e === value && ('h' in object) == false) {
            getButton('h');
            return true;
        }else if (object.b === value && object.h === value && ('e' in object) == false) {
            getButton('e');
            return true;
        }

        // check for all possible "C" defenses
        if (object.c === value && object.e === value && ('g' in object) == false) {
            getButton('g');
            return true;
        }else if (object.c === value && object.g === value && ('e' in object) == false) {
            getButton('e');
            return true;
        }else if (object.c === value && object.f === value && ('i' in object) == false) {
            getButton('i');
            return true;
        }else if (object.c === value && object.i === value && ('f' in object) == false) {
            getButton('f');
            return true;
        }
        else{
            // do nothing
        }

        // check for all possible "D" defenses
        if (object.d === value && object.e === value && ('f' in object) == false) {
            getButton('f');
            return true;
        }else if (object.d === value && object.f === value && ('e' in object) == false) {
            getButton('e');
            return true;
        }else if (object.d === value && object.g === value && ('a' in object) == false) {
            getButton('a');
            return true;
        }else if (object.c === value && object.i === value && ('f' in object) == false) {
            getButton('f');
            return true;
        }
        else{
            // do nothing
        }

        // check for all possible "E" defenses
        if (object.e === value && object.f === value && ('d' in object) == false) {
            getButton('d');
            return true;
        }else if (object.e === value && object.i === value && ('a' in object) == false) {
            getButton('a');
            return true;
        }else if (object.e === value && object.h === value && ('b' in object) == false) {
            getButton('b');
            return true;
        }else if (object.e === value && object.g === value && ('c' in object) == false) {
            getButton('c');
            return true;
        }
        else{
            // do nothing
        }

        // check for all possible "F" defenses
        if (object.f === value && object.i === value && ('c' in object) == false) {
            getButton('c');
            return true;
        }else{
            // do nothing
        }
        
        // check for all possible "G" defenses
        if (object.g === value && object.h === value && ('i' in object) == false) {
            getButton('i');
            return true;
        }else if (object.g === value && object.i === value && ('h' in object) == false) {
            getButton('h');
            return true;
        }else{
            // do nothing
        } 
        
        // check for all possible "H" defenses
        if (object.h === value && object.i === value && ('g' in object) == false) {
            getButton('g');
            return true;
        }
        else{
            // do nothing
        }
        
        return false;
    };

    function attack(){
        console.log(`I'm in attack: firstPlayer = ${firstPlayer}`)
        
        if (firstPlayer === 'c' && currentPlayer === 'c') { // NOTE: ComputerValue = X;
           return checkDefenseOrAttack('x');
        }else if (firstPlayer === 'p'  && currentPlayer === 'c') { // NOTE: ComputerValue = O;
            // console.log(`Just Checking:  ${('c' in object)}`)  // for debugging purpose;
           return checkDefenseOrAttack('o');
        }else{
            // pass;
        }
    };

    function defend(){
        console.log(`I'm in defense: firstPlayer = ${firstPlayer}`)
        
        if (firstPlayer === 'c' && currentPlayer === 'c') { // NOTE: ComputerValue = X;
           return checkDefenseOrAttack('o');
        }else if (firstPlayer === 'p' && currentPlayer === 'c') { // NOTE: ComputerValue = O;
            // console.log(`Just Checking: ${('c' in object)}`)  // for debugging purpose;
           return checkDefenseOrAttack('x');
        }else{
            // pass;
        }
    };

    function strategicMove(){
        console.log(`I'm in StrategicMove: firstPlayer = ${firstPlayer}`)
        let options = []  // temporal computer strategic move options;
        let selectedChoice = ''  // temporal choice made by computer;
        
        if (firstPlayer === 'c' && currentPlayer === 'c') { // NOTE: ComputerValue = X;
           return checkStrategy('o', 'x')
        }else if(firstPlayer === 'p' && currentPlayer === 'c') { // NOTE: ComputerValue = O;
           return checkStrategy('x', 'o');
        }else {
            // pass
        }

        // function for thinking strategically
        function checkStrategy(playerValue, computerValue){
            if (difficult === 'easy'){
                easy(playerValue, computerValue);
            }else if (difficult === 'medium'){
                medium(playerValue, computerValue);
            }else {
                hard(playerValue, computerValue);
            };

            function easy(playerValue, computerValue) {
                if (availableKeys.length == 0 && currentPlayer === 'c') {
                    getButton(pickRandom());
                    return true;
                }else {
                    let randValue = pickRandomValue(allKeys);
                    getButton(randValue);
                    return true;
                };
            };

            function medium(playerValue, computerValue){
                // console.log("\nI am in medium!\n")  // for debugging purpose
                if (availableKeys.length == 0 && currentPlayer === 'c') {
                    // `Available Key Length is = 0; Actual AvailableKey = ${availableKeys.length}`  // for debugging purpose
                    getButton(pickRandom());
                    return true;
                } // Make move when firstMove was made by the player
                else if (availableKeys.length == 1 && currentPlayer === 'c'){
                    // console.log('AvailableKeys Length is = 1');  // for debugging purpose
                    // First Player Game at corner (top, or bottom i.e a, c, g or i);
                    if (object.a === playerValue) {
                        options = ['i', 'e'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.c === playerValue){
                        options = ['g', 'e'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.g === playerValue){
                        options = ['c', 'e'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.i === playerValue){
                        options = ['a', 'e'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }
    
                    // First Player Game at middle corner (i.e b, d, f or h);
                    else if (object.b === playerValue) {
                        options = ['h', 'e'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.d === playerValue){
                        options = ['f', 'e'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.f === playerValue){
                        options = ['d', 'e'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.h === playerValue){
                        options = ['b', 'e'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }
    
                    // If non of the conditions above, play randomly.
                    else{
                        // Make random choice
                        let randValue = pickRandomValue(allKeys);
                        getButton(randValue);
                        return true;
                    };
                } // Make move when player makes their second move
                else if (availableKeys.length == 3 && currentPlayer === 'c'){
                    // console.log(`Available Key Length is = 3; Actual AvailableKey = ${availableKeys.length}`)  // for debugging purpose

                    // if (object.c === computerValue && object.h === computerValue && currentPlayer == 'c'){
                    //     let SelectedValue = 'e';
                    //     getButton(SelectedValue);
                    //     return true;
                    // First Player Game at corner (top, or bottom i.e a, c, g or i)
                    // And Player second move is at the opposite center corners i.e a-f, c-d, g-f, i-d;
                    if (object.a === playerValue && object.f == playerValue) {
                        if ('e' in object) {
                            options = ['i'];
                        }else{
                            options = ['e'];
                        };
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.c === playerValue && object.d == playerValue) {
                        if ('e' in object) {
                            options = ['g'];
                        }else{
                            options = ['e'];
                        };
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.g === playerValue && object.f == playerValue) {
                        if ('e' in object) {
                            options = ['c'];
                        }else{
                            options = ['e'];
                        };
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.i === playerValue && object.d == playerValue) {
                        if ('e' in object) {
                            options = ['a'];
                        }else{
                            options = ['e'];
                        };
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }
                    // Move when player is having two of their games played in a way it seems like a the computer had played a defense move. E.g
                    // computer in a and player in e and i. This is a tactical move and a trap. To overcome it, the computer most not play in the middle
                    // corners but must play at the hedges.
                    else if (object.a === computerValue && object.e === playerValue && object.i === playerValue) {
                        options = ['c', 'g'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.b === computerValue && object.e === playerValue && object.h === playerValue) {
                        options = ['a', 'c', 'h', 'i'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.c === computerValue && object.e === playerValue && object.g === playerValue) {
                        options = ['a', 'i'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.d === computerValue && object.e === playerValue && object.f === playerValue) {
                        options = ['a', 'c', 'g', 'i'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.f === computerValue && object.e === playerValue && object.d === playerValue) {
                        options = ['a', 'c', 'g', 'i'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.g === computerValue && object.e === playerValue && object.c === playerValue) {
                        options = ['a', 'i'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.h === computerValue && object.e === playerValue && object.b === playerValue) {
                        options = ['a', 'c', 'g', 'i'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.i === computerValue && object.e === playerValue && object.a === playerValue) {
                        options = ['c', 'g'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }
                    // if all conditions fail, make random choice
                    else{
                        // Make random choice
                        let randValue = pickRandomValue(allKeys);
                        getButton(randValue);
                        return true;
                    };
                }
    
                // make random choice when all condition does not match
                else {
                    let randValue = pickRandomValue(allKeys);
                    getButton(randValue);
                    return true;
                };
            };

            function hard(playerValue, computerValue){
                if (availableKeys.length == 0 && currentPlayer === 'c') {
                    getButton(pickRandom());
                    return true;
                } // Make move when firstMove was made by the player
                else if (availableKeys.length == 1 && currentPlayer === 'c'){
                    // First Player Game at corner (top, or bottom i.e a, c, g or i);
                    if (object.a === playerValue) {
                        options = ['i', 'e'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.c === playerValue){
                        options = ['g', 'e'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.g === playerValue){
                        options = ['c', 'e'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.i === playerValue){
                        options = ['a', 'e'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }
    
                    // First Player Game at middle corner (i.e b, d, f or h);
                    else if (object.b === playerValue) {
                        options = ['h', 'e'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.d === playerValue){
                        options = ['f', 'e'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.f === playerValue){
                        options = ['d', 'e'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.h === playerValue){
                        options = ['b', 'e'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }
                    
                    // First Player Game at middle i.e. "e";
                    else if (object.e === playerValue) {
                        options = ['a', 'c', 'g', 'i'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }
    
                    // If non of the conditions above, play randomly.
                    else{
                        // Make random choice
                        let randValue = pickRandomValue(allKeys);
                        getButton(randValue);
                        return true;
                    };
                } // Make move when player makes their second move
                else if (availableKeys.length == 3 && currentPlayer === 'c'){
                    // if (object.c === computerValue && object.h === computerValue && currentPlayer == 'c'){
                    //     let SelectedValue = 'e';
                    //     getButton(SelectedValue);
                    //     return true;
                    // First Player Game at corner (top, or bottom i.e a, c, g or i)
                    // And Player second move is at the opposite center corners i.e a-f, c-d, g-f, i-d;
                    if (object.a === playerValue && object.f == playerValue) {
                        if ('e' in object) {
                            options = ['i'];
                        }else{
                            options = ['e'];
                        };
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.c === playerValue && object.d == playerValue) {
                        if ('e' in object) {
                            options = ['g'];
                        }else{
                            options = ['e'];
                        };
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.g === playerValue && object.f == playerValue) {
                        if ('e' in object) {
                            options = ['c'];
                        }else{
                            options = ['e'];
                        };
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }else if (object.i === playerValue && object.d == playerValue) {
                        if ('e' in object) {
                            options = ['a'];
                        }else{
                            options = ['e'];
                        };
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }

                    // Move when player is having two of their games played in a way it seems like a the computer had played a defense move. E.g
                    // computer in a and player in e and i. This is a tactical move and a trap. To overcome it, the computer most not play in the middle
                    // corners but must play at the earges.
                    else if (object.a === computerValue && object.e === playerValue && object.i === playerValue) {
                        options = ['c', 'g'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    } // no b because in hard, when player first move is at the middle, computer does not play at the middle corners but at the hedge. 
                    else if (object.c === computerValue && object.e === playerValue && object.g === playerValue) {
                        options = ['a', 'i'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    } // no d and f because in hard, when player first move is at the middle, computer does not play at the middle corners but at the hedge.
                    else if (object.g === computerValue && object.e === playerValue && object.c === playerValue) {
                        options = ['a', 'i'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    } // no h because in hard, when player first move is at the middle, computer does not play at the middle corners but at the hedge.
                    else if (object.i === computerValue && object.e === playerValue && object.a === playerValue) {
                        options = ['c', 'g'];
                        selectedChoice = pickRandomValue(options);
                        console.log(`Available Options = ${options}`)
                        console.log(`SelectedChoice = ${selectedChoice}`)
                        getButton(selectedChoice);  // make choice from options available
                        return true;
                    }
                    // if no of the conditions above is true, make random choice
                    else{
                        // Make random choice
                        let randValue = pickRandomValue(allKeys);
                        getButton(randValue);
                        return true;
                    };
                }
                else {
                    let randValue = pickRandomValue(allKeys);
                    getButton(randValue);
                    return true;
                };
            };
        };
    };
};

// function to get random number between the MaxNumber given as argument.
function getRandomNum(MaxNum){
    return Math.floor(Math.random() * MaxNum);
};

// function to check for a win or draw
function checkForWin(object) {
    // function to compare values horizontally, vertically and diagonally
    function compare(value){
        if (object.a === value && object.b === value && object.c === value){
            winner = value;
            winningButtons = ['a', 'b', 'c'];
            console.log(`Winner: ${winner}`);
            console.log(`WinningButtons = ${winningButtons}`);
            return true;
        }else if (object.a === value && object.d === value && object.g === value){
            winner = value;
            winningButtons = ['a', 'd', 'g'];
            console.log(`Winner: ${winner}`);
            console.log(`WinningButtons = ${winningButtons}`);
            return true;
        }else if (object.a === value && object.e === value && object.i === value){
            winner = value;
            winningButtons = ['a', 'e', 'i'];
            console.log(`Winner: ${winner}`);
            console.log(`WinningButtons = ${winningButtons}`);
            return true;
        } // b check
        else if (object.b === value && object.e === value && object.h === value){
            winner = value;
            winningButtons = ['b', 'e', 'h'];
            console.log(`Winner: ${winner}`);
            console.log(`WinningButtons = ${winningButtons}`);
            return true;
        } // c check
        else if (object.c === value && object.f === value && object.i === value){
            winner = value;
            winningButtons = ['c', 'f', 'i'];
            console.log(`Winner: ${winner}`);
            console.log(`WinningButtons = ${winningButtons}`);
            return true;
        }else if (object.c === value && object.e === value && object.g === value){
            winner = value;
            winningButtons = ['c', 'e', 'g'];
            console.log(`Winner: ${winner}`);
            console.log(`WinningButtons = ${winningButtons}`);
            return true;
        }// d check
        else if (object.d === value && object.e === value && object.f === value){
            winner = value;
            winningButtons = ['d', 'e', 'f'];
            console.log(`Winner: ${winner}`);
            console.log(`WinningButtons = ${winningButtons}`);
            return true;
        }// check bottom row
        else if (object.g === value && object.h === value && object.i === value){
            winner = value;
            winningButtons = ['g', 'h', 'i'];
            console.log(`Winner: ${winner}`);
            console.log(`WinningButtons = ${winningButtons}`);
            return true;
        }
        else{
            // do nothing;
            return false;
        };
    };
    
    // CHECK FOR A WINNER
    // check for X win
    let checkX = true;  // returns a true or false;
    let checkO = true; // returns a true or false;
    if (compare('x') === false) {
        checkX = false;
        // check for O win
        if (compare('o') === false){
            checkO = false;
        };
    };

    console.log(`CHECK X = ${checkX}`);  // for debugging;
    console.log(`CHECK O = ${checkO}`);  // for debugging;

    if (checkX === false && checkO === false){
        // check if all in box button is full and reset
        let objectKeyCount = Object.keys(object).length;
        console.log(`Object Keys: ${objectKeyCount}`);
        if (objectKeyCount >= 9 && object.a != '' && object.b != '' && object.c != '' && object.d != '' && object.e != '' && object.f != '' && object.g != '' && object.h != '' && object.i != '') {
            console.log('NO WIN')
            displayWinningButtons(initAllKeys);  // if no win, all buttons becomes winning button

            disableButtons(initAllKeys);
            setTimeout(() => {
                clearAll(gameObject);
                resetAll();
                resetAll();
                // increment rounds
                totalRounds += 1;
            }, 1000);
            setTimeout(function(){
                restWinningButtons(initAllKeys);
                enableButtons(initAllKeys);
            }, 1000);
            // clearAll(gameObject);
            // resetAll();
            // resetAll();
        };
        return false;
    }
    else {
        return true;
    };
};

// function to change the colors of the winning buttons
function displayWinningButtons(arrayValue) {
    arrayValue.forEach(key => {
        const element = document.getElementById(key)
        element.style.backgroundColor = 'white';
        element.style.color = 'black';
    });
};

// function to clear changes made by displayWinningButtons function
function restWinningButtons(arrayValue) {
    arrayValue.forEach(key => {
        let element = document.getElementById(key)
        element.style.backgroundColor = 'black';
        element.style.color = 'white';
    });
};

// button color
let btnColor = '';

// change button colors
function changeColor(elementId, firstColor, secondColor, textColor){
    // Change background color of element
    const element = document.getElementById(elementId);
    if ((btnColor === '' || btnColor === secondColor) && element.style.getPropertyValue('background-color') != textColor){
        btnColor = firstColor;
        element.style.backgroundColor = btnColor;
        element.style.color = textColor;
    }else if((btnColor === firstColor) && element.style.getPropertyValue('background-color') != textColor){
        btnColor = secondColor;
        element.style.backgroundColor = btnColor;
        element.style.color = textColor;
    }else{
        // pass;
    }
};

// disable all button in the array supplied to the function
function disableButtons(arrayValue){
    arrayValue.forEach(key =>{
        document.getElementById(key).setAttribute('disabled', true);
    });
};

// enable all button in the array supplied to the function
function enableButtons(arrayValue){
    arrayValue.forEach(key =>{
        document.getElementById(key).removeAttribute('disabled');
    })
};

// function to clear all button html value
function clearAll(object) {
    // convert object key value into an array
    objectKeys = Object.keys(object);
    // loop through and using the value to update the html
    objectKeys.forEach((key) => {
        const element = document.getElementById(key);
        element.value = '';  // clear button value
        element.innerHTML = '';  // clear button display
    });
};

// function to reset variables to default
function resetAll() {
    currentButtonId = '';  // store current button clicked id
    currentButtonKey = '';  // current button clicked value
    currentValue = 'O'; // store current value

    gameObject = {};  // storing key progress of each game
    // The key = button; value = displaying value of the button

    // Array for comparison
    allKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    availableKeys = [];
    
    enableButtons(allKeys);  // Enable all buttons;

    foundWinner = false;
    winner = '';  // holds the winner
    winningButtons = [];  // holds the buttons that cause the win

    // Reset first player to be between P(user) and C(computer);
    if (currentPlayer === 'p') {
        currentPlayer = 'c';
    }else {
        currentPlayer = 'p';
    }
    firstPlayer = currentPlayer;
    console.log(`CurrentFistPlayer: ${currentPlayer}`)
    console.log(`First Player: ${firstPlayer}`);
};

// display pause menu when pause button is clicked
function pauseMenu(){
    /*
    <div id="pauseGameMenuHolder">
        <div id="pauseGameMenu">
            <div id="screen">My name is Daniel Opute, I am a student of BYU-Idaho, I love programming and can program for straight 8hours without leaving my seat</div>
            <div id="buttonHolder">
                <button id="continueBtn" class="pauseMenuButtons">CONTINUE</button>
                <button id="endBtn" class="pauseMenuButtons">END</button>
            </div>
        </div>
    </div>
    */
    document.querySelector('#pauseGameMenuHolder').style.display = 'grid';
    document.querySelector('#screen').style.display = 'none';
};

// Fetch Advice Data
async function requestApi(url, displayFunction, retrieveKeywords) {
    const response = await fetch(url);
    if (response.ok) {
        // receive data and convert to JSON
        const data = await response.json();
        // console.log(`Advice JSON: ${data}`);
        displayFunction(data, retrieveKeywords);
    }
};

// display Game Pause menu when the pause button is clicked
function displayGameRewardMenu(){
    document.querySelector('#pauseGameMenuHolder').style.display = 'grid';
    document.querySelector('#continuePlaying').style.display = 'inline-block';
    document.querySelector('#continueBtn').style.display = 'none';
    const screen = document.querySelector('#screen');
    screen.style.display = 'grid';
    console.log(`Screen Display ID: ${screen}`);
    return screen;
};

// display Game Pause menu when player wins a game
function displayGameRewardJoke(data){
    // Get Reward with an api
    console.log(`Received JSON: ${JSON.stringify(data)}`);
    let reward = data;
    console.log(`Content Retrieved: ${JSON.stringify(reward)}`);
    displayGameRewardMenu().innerHTML = `<h2 class='rewardText'>CONGRATS YOU WON!🫣</h2><h3 class='rewardText'>Reward👇</h3><p id='rewardParagraph'>${reward.setup}</p><span style='text-align:center; margin: 20px; font-weight: lighter;: light;'>PUNCHLINE<br>${reward.punchline}</span>`;
};

// display Game pause menu when player lose a game
function displayGameRewardAdvice(data){
    // Get Reward with an api
    console.log(`Received JSON: ${JSON.stringify(data)}`);
    let reward = data;
    console.log(`Content Retrieved: ${JSON.stringify(reward)}`);
    displayGameRewardMenu().innerHTML = `<h2 class='rewardText'>YOU LOSE!🫣</h2><h3 class='rewardText'>Take This👇</h3><p id='rewardParagraph'>${reward[0].content}</p><span style='text-align:left; margin: 20px;'>Author: ${reward[0].author}</span>`;
};

// function to continue game after a player wins or loses a game
function continuePlaying(){
    // continue game after a win or a loose
    restWinningButtons(winningButtons);
    enableButtons(allKeys);
    clearAll(gameObject);
    resetAll();
    setTimeout(function() {
        // check if computer is to play the first move
        if (firstPlayer === 'c' && currentPlayer === 'c' && foundWinner == false){
            evaluateAndPlay(gameObject, foundWinner);
            // Note: With the reset function called, foundWinner is set to be false;
        };
    }, 10);
    document.querySelector('#pauseGameMenuHolder').style.display = 'none';
    document.querySelector('#screen').style.display = 'none';
    document.querySelector('#continuePlaying').style.display = 'none';
    document.querySelector('#continueBtn').style.display = 'inline-block';
};

// function to continue game when a player clicks the pause button
function continueFromPause(){
    document.querySelector('#pauseGameMenuHolder').style.display = 'none';
    document.querySelector('#screen').style.display = 'none';
};

// function to end game
function endGame(){
    let confirmEnd = confirm('Are you sure you want to end game?')
    if (confirmEnd){
        document.querySelector('#continueBtn').disabled = true;
        document.querySelector('#continuePlaying').disabled = true;
        document.querySelector('#endBtn').disabled = true;
        submitResults();
    }else{
        // pass
    }
};

// function to get input game progress values into a form and submit the form.
function submitResults(){
    /*
    <label>Player Name<br />
                    <input type="text" name="Player-Name" size="30" placeholder="Player Name" id="playerName"
                        required />
                </label><br />
                <label>Difficulty<br />
                    <input type="text" id="difficulty" name="Difficulty" size="30" placeholder="Difficulty"
                        required />
                </label><br />
                <label>Player-Score<br />
                    <input type="text" id="playerScore" name="Player-Score" size="30" placeholder="Score"
                        required />
                </label><br />
                <label>Computer-Score<br />
                    <input type="text" id="computerScore" name="Computer-Score" size="30" placeholder="Score"
                        required />
                </label><br />
                <!-- Submit Button-->
                <button id="submitButton" type="submit" name="Submit-Date" value="Todays Date">Submit</button>
            </fieldset>

            <!-- Customize the Thankyou Message People See when they submit the form: This will be hidden-->
            <div class="thankyou_message" id="message-display" style="display:none;"></div>
    */
   // Get all result values
   let name = document.getElementById('playerName');
   let gameDifficulty = document.getElementById('difficulty');
   let playerTotalScore = document.getElementById('playerScore');
   let computerTotalScore = document.getElementById('computerScore');
   let totalGameRounds = document.getElementById('gameRounds');
   const formSubmitBtn = document.getElementById('submitButton')

   // update values
   name.value = playerName;
   gameDifficulty.value = difficult;
   playerTotalScore.value = playerScore;
   computerTotalScore.value = computerScore;
   totalGameRounds.value = totalRounds;

   let current_date = new Date();
   formSubmitBtn.value = current_date;

   formSubmitBtn.click();
};


// It took approximately 72 hours to complete.