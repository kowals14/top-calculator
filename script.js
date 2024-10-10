var a = 0;
var b = 0;
var operator = null;

var newOperand = false;

const numpad = document.querySelectorAll(".row > div");
const display = document.getElementById("textbox");

const operate = function() {
	console.log("Performing operation, a: " + a + ", b: " + b + ", operator: " + operator);
	switch(operator) {
		case "+":
			return a + b;
		case "-":
			return a - b;
		case "*":
			return a * b;
		case "/":
			return a / b;
		default:
			return "ERR";
	}
}

const readDisplay = function() {
	console.log("Reading display: " + Number(display.innerHTML));
	return Number(display.innerHTML);
}

const updateDisplay = function(num) {
	display.innerHTML = num;
}

const appendDigit = function(digit) {
	display.innerHTML = display.innerHTML + digit;
}

// this function updates the display with a new initial operand
// and sets the necessary conditions to input a new operator and operand
const resetOperation = function(num) {
	a = num;
	updateDisplay(num);
	operator = null;
	newOperand = false;
	console.log("Resetting operation, initializing a with: " + a);
}

numpad.forEach((num) => {
	num.addEventListener("mousedown", (event) => {
		const key = event.target;
		key.style.background = "rgba(184, 188, 190, 0.95)";
		switch(key.id) {
			case "AC":
				resetOperation(0);
				break;
			case "=":
				if(operator) {
					b = readDisplay();
					// divide by zero check
					if(operator == "/" && b == 0) {
						resetOperation("ERR");
						break; 
					}
					resetOperation(operate());
					break;
				}
				break;
			case "%":
				updateDisplay(readDisplay() / 100);
				break;
			case "+/-":
				updateDisplay(readDisplay() * -1);
				break;
			case "+":
			case "-":
			case "*": 
			case "/":
				a = readDisplay();
				newOperand = true;
				operator = key.id;
				break;
			default:
				if(readDisplay().toString().length < 15) {
					if(newOperand || readDisplay() == 0) {
						updateDisplay(key.id);
						newOperand = false;
					}
					else {
						appendDigit(key.id);
					}
				}
				break;
		}	
	});
	num.addEventListener("mouseup", (event) => {
		event.target.style.background = "rgba(184, 188, 190, 0.65)";
	});
});
