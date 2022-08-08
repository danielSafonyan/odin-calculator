let currentResult = document.querySelector(".running span");

let numA = 0;
let numB = 0;
let operation = '';
 
const numButtons = document.querySelectorAll('.button.num');
numButtons.forEach(button => button.addEventListener('click', dialNumber));

function dialNumber(event) {
    if (numA === currentResult.innerText) {
        currentResult.innerText = '';
        currentResult.innerText += event.target.innerText;
    } else {
        if (currentResult.innerText === '0' && event.target.innerText == '.') {
            currentResult.innerText = '0.';
        } else if (currentResult.innerText === '0' || currentResult.innerText === '0.00') {
            currentResult.innerText = event.target.innerText;
        } else {
            if (event.target.innerText === '.' 
                && currentResult.innerText.includes('.')) {
                console.log("Floating poin can have only one '.'")
                return;
            }
            currentResult.innerText += event.target.innerText;
        }
    }
}

const operationButtons = document.querySelectorAll('.button.operation');
operationButtons.forEach(button => button.addEventListener('click', choseOperation));

function choseOperation(event) {
    const operationShadow = event.target.innerText;
    if (operationShadow !== "=") {
        numA = currentResult.innerText;
        operation = operationShadow;
    } else if (operationShadow === "="){
        numB = currentResult.innerText;
        makeCalculation(operation, numA, numB)
    }
    
}

function makeCalculation(operation, numA, numB) {
    let result = 0;
    switch(operation) {
        case '÷':
            result = +numA / +numB;
            if (result === Infinity) {
                result = "NaN";
            };
            break;
        case '×':
            result = +numA * +numB;
            break;
        case '−':
        result = +numA - +numB;
        break;
        case '+':
        result = +numA + +numB;
            break;
    }
    currentResult.innerText = removePrecision(result.toFixed(2));
    console.log(removePrecision(result.toFixed(2)));
}

let clearButton = document.querySelector("#clear");
clearButton.addEventListener('click', () => {
    numA = 0;
    numB = 0;
    currentResult.innerText = 0;
    operation = '';
});

function removePrecision(number){
    if (number.endsWith('.00')) {
        return number.replace('.00','');
    }
    return number;
}