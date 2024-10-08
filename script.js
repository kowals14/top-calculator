const operate = function(a, b, operator) {
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

const numpad = document.querySelectorAll(".row > div");
const display = document.getElementById("textbox");
const args = [];

numpad.forEach((num) => {
	num.addEventListener("mousedown", (event) => {
		const key = event.target;
		key.style.background = "rgba(184, 188, 190, 0.95)";
		switch(key.id) {
			case "clr":
				display.innerHTML = "";
				args.length = 0;
				break;
			case "=":
				if(args.length == 3) {
					let result = operate(args[0], args[2], args[1]);
					display.innerHTML = result;
					args.length = 1;
					args[0] = result;
				}
				break;
			case "+" :
			case "-" :
			case "*" :
			case "/" :
				if(args.length == 1) {
					args.push(key.id);
					display.innerHTML = display.innerHTML + key.id;
					console.log("Operator: " + key.id);
				}
				break;
			default:
				if(args.length == 0 || args.length == 2) {
					args.push(Number(key.id));
				}
				else {
					args[args.length - 1] = args[args.length - 1] * 10 + Number(key.id);
				}
				display.innerHTML = display.innerHTML + key.id;
				break;
		}
	
	});
	num.addEventListener("mouseup", (event) => {
		event.target.style.background = "rgba(184, 188, 190, 0.65)";
	});
});
