const lastOperation = document.querySelector('#lastOperation');
const currentOperation = document.querySelector('#currentOperation');
const clearBtn = document.querySelector('#clear');
const changeSign = document.querySelector('#changeSign');
const number = document.querySelectorAll('#numbers');
const operations = document.querySelectorAll('#operations');
const dot = document.querySelector('#dot');
const equals = document.querySelector('#equals');
const screen = document.querySelector('#screen');
const buttons = document.querySelectorAll('button');

let a, b;
let operation;
let result;
let index = 1;

const appendNumber = (event) => {
    if(currentOperation.textContent === '0'){
        currentOperation.textContent = event.target.textContent;
    } else {
        currentOperation.textContent += event.target.textContent;
    }
}

const appendOperation = (event) => {
    if(lastOperation.textContent === ''){
        operation = event.target.textContent;
        a = Number(currentOperation.textContent);
        lastOperation.textContent = currentOperation.textContent + operation;
        currentOperation.textContent = '';
        index = 0;
    } else if(index === 0){
        b = Number(currentOperation.textContent);
        calculate(a, b, operation);
        a = result;
        operation = event.target.textContent;
        lastOperation.textContent = `${result}` + operation;
        currentOperation.textContent = '';
    } else if(index === 1){
        operation = event.target.textContent;
        lastOperation.textContent = `${a}${operation}`;
        currentOperation.textContent = '';
    }
}

const addDot = () =>{
    if((typeof Number(currentOperation.textContent.slice(-1))) === 'number'){
        currentOperation.textContent += '.';
    }
}

const calculate = (a, b, operation) => {
    switch(operation){
        case '÷':
            return result = divide(a, b);
            break;
        case '×':
            return result = multiply(a, b);
            break;
        case '-':
            return result = substitute(a, b);
            break;
        case '+':
            return result = add(a, b);
            break;
        case '%':
            return result = percentage(a, b);
            break;
    }
}

const clear = () => {
    currentOperation.textContent = '0';
    lastOperation.textContent = ''
}

number.forEach(button => {
    button.addEventListener('click', appendNumber);
})

operations.forEach(button => {
    button.addEventListener('click', appendOperation);
})

equals.addEventListener('click', function (){
    if(typeof a === 'number' || typeof b === 'number') {
        b = Number(currentOperation.textContent);
        calculate(a, b, operation);
        lastOperation.textContent += currentOperation.textContent;
        currentOperation.textContent = result;
        a = result;
        index = 1;
    }
});

clearBtn.addEventListener('click', function () {
    clear();
    index = 1;
});

const add = (a, b) => {
    return a + b;
}
const substitute = (a, b) => {
    return a - b;
}
const multiply = (a, b) => {
    return Math.round((a * b) * 1000) / 1000;
}
const divide = (a, b) => {
    if(b !== 0){
        return Math.round((a / b) * 1000) / 1000;
    } else {
        return undefined;
    }    
}
const percentage = (a, b) => {
    return Math.round(((a / b) * 100) * 1000) / 1000;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        let length = currentOperation.textContent.length;
        let size = 60;
        if(length < 7) {
            currentOperation.style.fontSize = `60px`;
        } else {
            size -= length * 1.5;
            currentOperation.style.fontSize = `${size}px`;
        }
    })
})