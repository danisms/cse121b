/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
function add(number1, number2) {
    return number1 + number2;
}

// function to get value fro 
function addNumbers() {
    let number1 = Number(document.getElementById('add1').value);
    let number2 = Number(document.getElementById('add2').value);
    document.querySelector('#sum').value = add(number1, number2);
}

document.querySelector('#addNumbers').addEventListener('click', addNumbers);


/* Function Expression - Subtract Numbers */
function subtract(number1, number2) {
    return number1 - number2
}

function subtractNumbers() {
    let num1 = Number(document.querySelector('#subtract1').value);
    let num2 = Number(document.querySelector('#subtract2').value);
    document.querySelector('#difference').value = subtract(num1, num2);
}

document.querySelector('#subtractNumbers').addEventListener('click', subtractNumbers);

/* Arrow Function - Multiply Numbers */
let multiply = (num1, num2) => num1 * num2;
let multiplyNumbers = () => document.querySelector('#product').value = multiply(Number(document.querySelector('#factor1').value), Number(document.querySelector('#factor2').value));
document.querySelector('#multiplyNumbers').addEventListener('click', multiplyNumbers);


/* Open Function Use - Divide Numbers */
let divide = (num1, num2) => num1 / num2;
function divideNumbers() {
    let number1 = Number(document.getElementById('dividend').value);
    let number2 = Number(document.getElementById('divisor').value);
    document.querySelector('#quotient').value = divide(number1, number2);
}

document.getElementById('divideNumbers').addEventListener('click', divideNumbers);

/* Decision Structure */
let calculateDiscount = (amount) => amount - (amount * 0.2);

function calculateTotal() {
    let userSubtotal = document.getElementById('subtotal').value;
    // validate userSubtotal value
    console.log(String(userSubtotal).length);  // for debugging purpose
    if (String(userSubtotal).length < 1) {
        alert('The subtotal value entered is not valid.\n Please enter a valid amount.');
    }else {
        userSubtotal = Number(userSubtotal);
        let checked = document.getElementById('member').checked;
        console.log(checked);
        let discount = (checked) ? calculateDiscount(userSubtotal): userSubtotal;
        document.querySelector('#total').textContent = `$${discount.toFixed(2)}`;
    }
}

document.querySelector('#getTotal').addEventListener('click', calculateTotal);


/* ARRAY METHODS - Functional Programming */
/* Output Source Array */
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
// display array numbers value
document.querySelector('#array').textContent = numbers;

/* Output Odds Only Array */
let oddNumbers = numbers.filter(number => number % 2 === 1);
console.log(oddNumbers);  // for testing purpose
document.getElementById('odds').textContent = oddNumbers;


/* Output Evens Only Array */
let evenNumbers = numbers.filter(number => number % 2 === 0);
document.getElementById('evens').textContent = evenNumbers;

/* Output Sum of Org. Array */
let sumOfArray = numbers.reduce((sum, number) =>  sum + number);
// Note: number represent the start value and in our list it is 1
// Note: sum represent to total to store the added value and it represents 0 at initial i.e.
// 0 + 1 = 0 step 1
// 1 + 2 = 3 step 2
// 3 + 3 = 6 step 4
// 6 + 4 = 10 step 5
// 10 + 5 = 15 step 6
// 15 + 6 = 21 step 7
// 21 + 7 = 28 step 8
// 28 + 8 = 36 step 9
// 36 + 9 = 45 step 10
// 45 + 10 = 55 step 11
// 55 + 11 = 66 step 12
// 66 + 12 = 78 step 13
// 78 + 13 = 91 final step. 
document.querySelector('#sumOfArray').textContent = sumOfArray;

/* Output Multiplied by 2 Array */
multipliedArray = numbers.map(num => num * 2);
document.querySelector('#multiplied').textContent = multipliedArray;

/* Output Sum of Multiplied by 2 Array */
document.querySelector('#sumOfMultiplied').textContent = multipliedArray.reduce((sum, num) => sum + num);
