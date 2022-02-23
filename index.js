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
    if (b == 0){
        return "Get out of here!"
    }
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
    if (result > 9999999999999){
        return "Number too big!";
    };
    return result;
};

var a = 0;
var b = 0;
var op = "0";
var result = 0;
var opStepOne = false;
var opStepTwo = false;
var lastClickOp = false;
var lastClickR = false;

function input(click) {
    var tbInput = document.getElementById("tbInput");
    console.log(opStepOne)
    console.log(opStepTwo)
    if (click.value == "AC") {
        a = 0;
        b = 0;
        op = "0";
        result = 0;
        opStepOne = false;
        opStepTwo = false;
        lastClickOp = false;
        lastClickR = false;
        tbInput.value = result;
    }else if (click.value == "=") {
        if (opStepOne == false){
            a = parseFloat(tbInput.value);
            tbInput.value = a;
            opStepOne = true;
            lastClickOp = true;
            lastClickR = true;
        }else if (opStepTwo == false) {
            b = parseFloat(tbInput.value);
            result = operator(a, b, op);
            tbInput.value = result;
            lastClickOp = true;
            lastClickR = true;
            opStepTwo = true;
            if (result == 0){
                opStepOne = false;
                opStepTwo = false;
            }
        } else {
            if(lastClickR == false){
                console.log("darn: ")
                b = parseFloat(tbInput.value);
            };
            result = operator(result, b, op);
            tbInput.value = result;
            lastClickOp = true;
            lastClickR = true;
            console.log("b: " + b)
            if (result == 0){
                opStepOne = false;
                opStepTwo = false;
            }
        }
    }else if (isNaN(click.value) && click.value != "."){
        lastClickR = false;
        if (lastClickOp == true){
            op = click.value;
            lastClickOp = true;
        }else if (opStepOne == false){
            a = parseFloat(tbInput.value);
            op = click.value;
            tbInput.value = a;
            opStepOne = true;
            lastClickOp = true;
        }else if (opStepTwo == false) {
            b = parseFloat(tbInput.value);
            result = operator(a, b, op);
            op = click.value;
            tbInput.value = result;
            opStepTwo = true;
            lastClickOp = true;
            if (result == 0){
                opStepOne = false;
                opStepTwo = false;
            }
        } else {
            b = parseFloat(tbInput.value);
            result = operator(result, b, op);
            op = click.value;
            tbInput.value = 0;
            tbInput.value = result;
            lastClickOp = true;
            lastClickR = false;
            if (result == 0){
                opStepOne = false;
                opStepTwo = false;
            }
        }
    }else {
        if (lastClickR == true){
            a = 0
            b = 0
            op = "0"
            result = 0
            opStepOne = false
            opStepTwo = false
            lastClickOp = false
            lastClickR = false;
            tbInput.value = ""
            tbInput.value = click.value;
            return;
        }
        if (tbInput.value.length > 12){
            return;
        }
        lastClickR = false;
        if (lastClickOp == true){
            tbInput.value = 0;
        }
        lastClickOp = false;
        if (tbInput.value.includes(".", 0) == true){
            if (click.value == "."){
                return;
            }
        }
        if (tbInput.value == 0){
            tbInput.value = "";
            tbInput.value = tbInput.value + click.value;
        }else {
            tbInput.value = tbInput.value + click.value;
        };
    };
};

function del() {
    var tbInput = document.getElementById("tbInput");
    tbInput.value = tbInput.value.substr(0, tbInput.value.length -1);
};

$('input').on('keypress', function (event) {
    var regex = new RegExp("^[0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
       event.preventDefault();
       return false;
    }
});

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