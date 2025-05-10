function add(num1, num2){
    return num1 + num2; 
}
function subtract(num1, num2){
    return num1 - num2;
}
function multiply(num1, num2){
    return num1*num2;
}
function divide(num1, num2){
    return num1/num2;
}
function operation(str, num1, num2){
    var a = 0;
    if(str == "+"){
        a = add(num1, num2);
    }
    else if(str == "-"){
        a = subtract(num1, num2);
    }
    else if(str == "*"){
        a = multiply(num1, num2);
    }
    else{
        a = divide(num1, num2);
    }
    return a;
}

var btn = document.getElementById("button");
var num1 = "";
var num2 = "";
var ansOnScreen = false;
let currentOp = null;
let waitingForNextNum = false;

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {

    button.onclick = function() {
        const value = this.getAttribute('data-value');
const display = document.querySelector('.text');

if (value === 'AC') {
    display.textContent = "";
    num1 = null;
    currentOp = null;
    ansOnScreen = false;
    waitingForNextNum = false;
} 
else if (value === 'Del') {
    display.textContent = display.textContent.slice(0, -1);
} 
else if (/^[0-9.]$/.test(value)) {
    if (ansOnScreen || waitingForNextNum) {
        display.textContent = value;
        ansOnScreen = false;
        waitingForNextNum = false;
    } else {
        display.textContent += value;
    }
} 
else if (['+', '-', '*', '/'].includes(value)) {
    if (num1 !== null && currentOp !== null && !waitingForNextNum) {
        const num2 = parseFloat(display.textContent);
        num1 = operation(currentOp, num1, num2);
        display.textContent = num1 + value;
    } else {
        num1 = parseFloat(display.textContent);
        display.textContent = num1 + value;
    }
    currentOp = value;
    waitingForNextNum = true;
} 
else if (value === '=') {
    if (num1 !== null && currentOp !== null && !waitingForNextNum) {
        const num2 = parseFloat(display.textContent);
        const result = operation(currentOp, num1, num2);
        display.textContent = result;
        num1 = null;
        currentOp = null;
        ansOnScreen = true;
    }
}
};
});
