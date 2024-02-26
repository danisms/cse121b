/*
let full_name = prompt(`Hello! What's Your Full Name?`)
full_name.toUpperCase;
let random_num1 = Math.random()*10
random_num1 = Math.floor(random_num1)
let random_num2 = Math.random()*10
random_num2 = Math.ceil(random_num2)
*/
/*
alert(`Hi ${full_name}, Welcome to Tell Your Age`)
alert(`My name is Age Maths Trick, I was designed by Daniel Opute to tell you your age.`)
alert(`Please follow the instructions and I will tell you your age.`)
alert('Always reply yes when asked to confirm to proceed')
prompt(`Are you ready?`)
prompt('Visualize your age in your mind... Is it two digits? Reply Yes if I am correct')
alert('Thank you! Now seperate the digits. E.g. if mine is 02, I will seprate to 0  &  2')
prompt('Have you done so?')
alert('The first digit, multiply by 5')
prompt('Have you done so?')
alert(`Add ${random_num1} to your answer`)
prompt('Have you done so?')
alert(`Subtract ${random_num2} from your answer`)
prompt('Have you done so? ')
alert(`Multiply your answer by 2`)
prompt(`Have you do so?`)
alert(`Add the second digit to answer, i.e. 2 from my sample age of 02`)
prompt('Have you done so?')
let total = prompt(`What's the total sofar`)
let cal_ran_num = total - 2*(random_num1 - random_num2)
alert(`Your age is ${cal_ran_num}`)
document.getElementById('age').innerHTML = `Your age is ${cal_ran_num}`;
*/

/*
<main>
        <div class = "box" id="main-display-box">
            <div id="display">
                <p>
                    Welcome To Tell My age!<br><br>
                    Enter Your Name In the Box below and press next to begin.
                </p>
                <input id="get-input">
            </div>
            <!-- <input id="get-input"> -->
            <div id="btnHolder">
                <button onclick="processTask()" value="YES" id="btn-yes" class="button">YES</button>
                <button onclick="processTask()" value="NEXT" id="btn-next" class="button">NEXT</button>
                <button onclick="processTask()" value="NO" id="btn-no" class="button">NO</button>
            </div>
        </div>
    </main>
*/

// get first display
let display = document.querySelector('#display');
let paragraph = document.querySelector('p');
let input = document.querySelector('#get-input');
let btnYes = document.querySelector('#btn-yes');
let btnNo = document.querySelector('#btn-no');
let btnNext = document.querySelector('#btn-next');

// get second display
/* 
<div id="second-display">
    <div id="second-display-value-holder">
        <h2>Result</h2>
        <p id="second-paragraph">
            You are _ Year Old <br> Am I correct?
        </p>
        <div id="btnHolder2">
            <button value="yes" id="btn-yes2" class="button">YES</button>
            <button value="restart" id="btn-restart" class="button">RESTART</button>
            <button value="no" id="btn-no2" class="button">NO</button>
        </div>
    </div>
</div>
*/
let display2 = document.querySelector('#second-display')
let display2_value_holder = document.querySelector('#second-display-value-holder')
let display2_paragraph = document.querySelector('#second-paragraph')
let btnYes2 = document.querySelector('#btn-yes2')
let btnNo2 = document.querySelector('#btn-no2')
let btnRestart = document.querySelector('#btn-restart')


let user_name = '';
let que_count = 0;
let random_num1 = 0;
let random_num2 = 0;
let user_option = '';
let include_sub = '';
let user_total = 0;
let user_result = '';

if (que_count == 0){
    textByLetter(`Enter Your Name In the Box below and press next to begin.`, paragraph, 50)
};

// assign values
btnYes.addEventListener('click', ()=>{user_option = btnYes.value; console.log(user_option); processTask();});
btnNo.addEventListener('click', ()=>{user_option = btnNo.value; console.log(user_option); processTask();});
btnNext.addEventListener('click', ()=>{processTask()});

btnYes2.addEventListener('click', ()=>{user_option = btnYes2.value; console.log(user_option); processTask();});
btnNo2.addEventListener('click', ()=>{user_option = btnNo2.value; console.log(user_option); processTask();});
btnRestart.addEventListener('click', restart);

function restart(){
    open('index.html', '_self')
}

function processTask(){
    switch(que_count){
        case 0:
            if (input.value.trim() == ''){
                alert('Please enter your name in the box provided below to begin.')
                console.log(`que_count = ${que_count}`);
                break
            }else if (input.value.trim().length < 3){
                alert('Your name should be more than three(3) characters.')
                break
            }
            else{
                user_name = input.value;
                ++que_count;
                console.log(`Player Name: ${user_name}`);
                console.log(`Question Count: ${que_count}`);
            };
        case 1:
            // hide input
            console.log('I just hide input');
            input.style.display = 'none';
            // capitalize user name
            let fname_lname_list = user_name.split(' ');
            user_name = '';
            fname_lname_list.forEach((name) =>{
                user_name += `${name[0].toUpperCase()}${name.substring(1)} `;
            });
            textByLetter(`Hi ${user_name}, Welcome to Tell Your Age My name is Age Maths Trick, I was designed by Daniel Opute to tell your age. Please follow the instructions and I will tell your age. Click Next to begin.`, paragraph, 50)
            ++que_count;
            console.log(`Question Count: ${que_count}`);
            break
        case 2:
            // hide next button and display yes and no buttons
            btnNext.style.display = 'none';
            btnYes.style.display = 'block';
            btnNo.style.display = 'block';
            textByLetter(`Visualize your age in your mind... Is it two digits?`, paragraph, 50)
            ++que_count;
            console.log(`Question Count: ${que_count}`);
            break
        case 3:
            // display next button and hide yes and no buttons
            btnNext.style.display = 'block';
            btnYes.style.display = 'none';
            btnNo.style.display = 'none';
            if (user_option === 'yes'){
                textByLetter(`Thank you. Now separate the digits.\n Example, if mine is 02, I will separate it into 0 and 2.
                \nOnce you've completed the separation, click next to continue.`, paragraph, 50);
            }else{
                textByLetter(`Thank you. Now add Zero(0) at the beginning of your age, and then separate the digits.
                \nExample, if I am 2 years old, by adding zero(0) at the beginning of my age it become 02. 
                Then I'll separate it into 0 and 2.
                \nOnce you've completed the separation, click next to continue.`, paragraph, 50);
            };
            ++que_count;
            console.log(`Question Count: ${que_count}`);
            break
        case 4:
            textByLetter(`The first digit, multiply it by 5.\n\nClick next to continue.`, paragraph, 50);
            ++que_count;
            console.log(`Question Count: ${que_count}`);
            break
        case 5:
            // generate a random number between 0 to 10
            random_num1 = Math.random() * 10
            random_num1 = Math.floor(random_num1)
            textByLetter(`Add ${random_num1} to your answer.\n\nClick next to continue.`, paragraph, 50);
            ++que_count;
            console.log(`Question Count: ${que_count}`);
            break
        case 6:
            // check if subtract should be included or not
            include_sub = Math.random();
            include_sub = Math.ceil(include_sub);
            console.log(`Include Subtract = ${include_sub}`);
            if (include_sub == 1){
                random_num2 = Math.random() * 10;
                random_num2 = Math.ceil(random_num2);
                textByLetter(`Subtract ${random_num2} from your answer\n\nClick next to continue.`, paragraph, 50);
                ++que_count;
            }else {
                ++que_count;
                processTask();
            }
            console.log(`Question Count: ${que_count}`);
            break
        case 7:
            textByLetter(`Multiply your answer by 2\n\nClick next to continue`, paragraph, 50);
            ++que_count;
            console.log(`Question Count: ${que_count}`);
            break
        case 8:
            textByLetter(`Add the second digit to your answer.\nWith my previous example my second digit will be 2 from the 02.
            \n\nClick next to continue.`, paragraph, 50);
            ++que_count;
            console.log(`Question Count: ${que_count}`);
            break
        case 9:
            // display the input box
            input.style.display = 'block';
            input.value = '';
            textByLetter(`What's your total sofar? Enter it in the box below and click next to continue.`, paragraph, 50);
            ++que_count;
            console.log(`Question Count: ${que_count}`);
            break
        case 10:
            // display the second-display box
            display2.style.display = 'block';
            display2_value_holder.style.display = 'block';
            
            // get total
            user_total = input.value;
            // calculate result
            user_result = cal_result(user_total, random_num1, random_num2);
            textByLetter(`${user_name}, You Are ${user_result} Years Old. \n Am I correct?`, display2_paragraph, 50);
            ++que_count;
            setTimeout(() => {
                btnYes2.style.display = 'block';
                btnNo2.style.display = 'block';
            }, 3000);
            console.log(`Question Count: ${que_count}`);
            break
        case 11:
            // display restart button and hide yes and no buttons
            btnYes2.style.display = 'none';
            btnNo2.style.display = 'none';
            btnRestart.style.display = 'block';

            if (user_option === 'yes'){
                textByLetter(`Thank you.`, display2_paragraph, 50);
            }else{
                textByLetter(`Thank you.`, display2_paragraph, 50);
            };
            ++que_count;
            console.log(`Question Count: ${que_count}`);
            break
    };
};

function textByLetter(text, refValue, speed) {
    let textList = text.split('');
    let indexNum = 0;
    let displayText = '';
    // Disable all buttons
    let allBtn = document.querySelectorAll('button')
    allBtn.forEach((button)=>{
        button.disabled = true;
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
                button.disabled = false;
            });
        };
    };
    writing = setInterval(() => {
        writeText();
    }, speed);
};

function cal_result(total, random_1, random_2) {
    result = total - 2 * (random_1 - random_2);
    return result;
};

// function display_button1(){
//     if (box1.style.display = 'flex'){
//         box1.style.display = 'none';
//         box2.style.display = 'flex';
//         box2.innerHTML = `Hi ${full_name}, Welcome to Tell Your Age \n 
//         My name is Age Maths Trick, I was designed by Daniel Opute to tell your age. \n
//         Please follow the instructions and I wll tell you age. Click Next for Next Page.`
//     }
//     else{
//         box1.style.display = 'flex';
//     }
//     display_button1();
// }
