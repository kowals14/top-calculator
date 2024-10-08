const operate = function(args) {
	let a = args[0];
	let b = args[1];

	switch(args[2]) {
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

const getArguments = function(entry) {
	// parse the string for the two number parameters and the operator symbol
	return [1, 1, "+"];
}


const numpad = document.querySelectorAll(".row > div");
const display = document.getElementById("textbox");

numpad.forEach((num) => {
	num.addEventListener("mousedown", (event) => {
		const key = event.target;
		key.style.background = "rgba(184, 188, 190, 0.95)";
		switch(key.id) {
			case "clr":
				display.innerHTML = "";
				break;
			case "=":
				let entry = display.innerHTML;
				display.innerHTML = operate(getArguments(entry));
				break;
			default:
				display.innerHTML = display.innerHTML + key.id;
				break;
		}
	
	});
	num.addEventListener("mouseup", (event) => {
		event.target.style.background = "rgba(184, 188, 190, 0.65)";
	});
});
