const add = function(a, b) {
  const result = a+b
  return result;
};

const subtract = function(a, b) {
	const result = a-b;
  return result;
};

const sum = function(numlist) {
	const result = numlist.reduce((total, number) => {return total + number}, 0);
  return result;
};

const divide = function(a, b) {
    const result = a / b;
    return result;
}

const multiply = function(numlist) {
  const result = numlist.reduce((total, number) => {return total * number}, 1);
  return result;
};

const power = function(a, b) {
	const result = a**b;
  return result;
};

const factorial = function(num) {
  numlist = [];
  for (let i = 1; i <= num; i++){
    numlist.push(i);
  };
  const result = numlist.reduce((total, number) => {return total * number}, 1);
	return result;
};

const nthRoot = function(a, b){
    result = a ** (1/b);
    return result;
}

const operator = function(a, b, op) {
    result = 0;
    switch(op) {
        case "x":
            result = multiply([a,b]);
            break;
        case "+":
            result = add(a,b);
            break;
        case "-":
            result = subtract(a,b);
            break;
        case "÷":
            result = divide(a,b);
            break;
        case "xⁿ":
            result = power(a,b);
            break;
        case "n√":
            result = nthRoot(a, b)
            break;
    };
    return result;
};

var a = 0
var b = 0
var op = "0"
var result = 0
var opStepOne = false
var opStepTwo = false
var lastClickOp = false

function input(click) {
    var tbInput = document.getElementById("tbInput");
    if (click.value == "AC") {
        a = 0
        b = 0
        op = "0"
        result = 0
        opStepOne = false
        opStepTwo = false
        lastClickOp = false
        tbInput.value = result;
    }else if (click.value == "=") {
        b = parseFloat(tbInput.value);
        result = operator(a, b, op);
        tbInput.value = 0;
        tbInput.value = result;
    }else if (isNaN(click.value) && click.value != "."){
        if (lastClickOp == true){
            op = click.value;
            lastClickOp = true;
        }else if (opStepOne == false){
            a = parseFloat(tbInput.value);
            op = click.value;
            tbInput.value = 0;
            opStepOne = true;
            lastClickOp = true;
        }else if (opStepTwo == false) {
            b = parseFloat(tbInput.value);
            console.log("a is " + a);
            console.log("b is " + b);
            console.log("op is " + op);
            result = operator(a, b, op);
            tbInput.value = result;
            opStepTwo = true;
            lastClickOp = true;
        } else {
            b = parseFloat(tbInput.value);
            result = operator(result, b, op);
            op = click.value;
            tbInput.value = 0;
            tbInput.value = result;
            lastClickOp = true;
        }
    } else {
        if (lastClickOp == true){
            tbInput.value = 0;
        }
        lastClickOp = false;
        if (tbInput.value == 0){
            tbInput.value = "";
            tbInput.value = tbInput.value + click.value;
        } else {
        tbInput.value = tbInput.value + click.value;
        };
    };
};

function del() {
    var tbInput = document.getElementById("tbInput");
    tbInput.value = tbInput.value.substr(0, tbInput.value.length -1);
};

$(window).ready(updateHeight);
$(window).resize(updateHeight);

function updateHeight(){
    var div = $('#calculator');
    var width = div.width();
    var btns = $('input');
    var dsply = $('#tbInput')

    div.css('height', width * 1.5);
    btns.css('width', width * 0.23);
    btns.css('height', width * 0.14);
    dsply.css('width', width * 0.80);
    dsply.css('height', width * 0.24)
};