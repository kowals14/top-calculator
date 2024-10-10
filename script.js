var a = 0;
var b = 0;
var operator = null;

var newOperand = false;
var decimal = false;

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
	return Number(display.innerHTML);
}

const updateDisplay = function(num) {
	display.innerHTML = num;
}

const appendDigit = function(digit) {
	display.innerHTML = display.innerHTML + digit;
}

// this function updates the display with a new initial operand 'num'
// and sets the necessary conditions to input the second operand
const resetOperation = function(num) {
	a = num;
	updateDisplay(num);
	operator = null;
	newOperand = false;
	decimal = false;
	console.log("Resetting operation, initializing a with: " + a);
}

// assign the desired behavior to the corresponding key
numpad.forEach((num) => {
	num.addEventListener("mousedown", (event) => {
		const key = event.target;
		key.style.background = "rgba(184, 188, 190, 0.95)";
		switch(key.id) {
			case "AC":
				resetOperation(0);
				break;
			case "=":
				// check we have chosen an operator
				// update the display to the result and reset to begin a new operation
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
				// when choosing the operator, set the first operand to the current 
				// value on the display and mark that we are now inputting the second operand
				a = readDisplay();
				newOperand = true;
				decimal = false;
				operator = key.id;
				break;
			case ".":
				// prevent adding more than one decimal point
				if(!decimal) { decimal = true; }
				else { break; }
			default:
				// check if the input is too big
				if(readDisplay().toString().length < 15) {
					// replace the number on the screen with a digit if the number is 0 or 
					// we are creating a new operand 
					if(newOperand || readDisplay() == 0) {
						updateDisplay(key.id);
						newOperand = false;
					}
					// otherwise we just append the digit to the end of the value on the display
					else { appendDigit(key.id); }
				}
		}	
	});
	num.addEventListener("mouseup", (event) => {
		event.target.style.background = "rgba(184, 188, 190, 0.65)";
	});
});
