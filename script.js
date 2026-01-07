const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let current = "";
let operator = "";
let previous = "";

function updateDisplay(value) {
    display.textContent = value || "0";
}

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const action = btn.dataset.action;
        const value = btn.textContent;

        if (!action) {

            current += value;
            if (operator) {
                updateDisplay(`${previous} ${symbol(operator)} ${current}`);
            } else {
                updateDisplay(current);
            }
        } else {
            switch (action) {
                case "clear":
                    current = "";
                    previous = "";
                    operator = "";
                    updateDisplay("0");
                    break;
                case "percent":
                    if (current) {
                        current = String(parseFloat(current) / 100);
                        updateDisplay(`${previous} ${symbol(operator)} ${current}`);
                    }
                    break;
                case "divide":
                case "multiply":
                case "subtract":
                case "add":
                    if (current) {
                        previous = current;
                        current = "";
                    }
                    operator = action;
                    updateDisplay(`${previous} ${symbol(operator)}`);
                    break;
                case "equals":
                    if (previous && operator && current) {
                        let result;
                        const prev = parseFloat(previous);
                        const curr = parseFloat(current);
                        switch (operator) {
                            case "divide": result = prev / curr; break;
                            case "multiply": result = prev * curr; break;
                            case "subtract": result = prev - curr; break;
                            case "add": result = prev + curr; break;
                        }
                        updateDisplay(result);
                        current = String(result);
                        operator = "";
                        previous = "";
                    }
                    break;
            }
        }
    });
});

function symbol(op) {
    switch (op) {
        case "divide": return "÷";
        case "multiply": return "×";
        case "subtract": return "−";
        case "add": return "+";
        default: return "";
    }
}