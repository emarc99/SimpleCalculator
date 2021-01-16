let runningTotal = 0;
// To keep track of user inputs
let buffer = "0";
// To keep track of previously used operator(s)
let pastOperator;

const screen = document.querySelector('.mi-calc-screen');

document.querySelector(".mi-calc-buttons").addEventListener("click", function(event) {
// innerText for taking values from buttons while value for takng from input
    buttonClick(event.target.innerText);
});

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    }
    else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    }
    else {
        buffer += value;
    }
}

function handleSymbol(value) {
    switch (value) {
        case 'Clear':
            buffer = "0";
            runningTotal = 0;
            pastOperator = null;
            break;
        case '=':
            if (pastOperator ===null) {
                return;
            }
            flushOperation(parseInt(buffer));
            pastOperator = null;
            // "" prevents buffer from not being a string
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case 'Del':
            if (buffer.length === 1) {
                buffer = "0";
            }
            else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer
    }
    else {
        flushOperation(intBuffer);
    }
    pastOperator = value;
    // necesary to be able to enter new value on screen
    buffer = "0";
}
function flushOperation(intBuffer) {
    if (pastOperator === "+") {
        runningTotal += intBuffer;
    }
    else if (pastOperator === "-") {
        runningTotal -= intBuffer;
    }
    else if (pastOperator === "*") {
        runningTotal *= intBuffer;
    }
    else if (pastOperator === "/") {
        runningTotal /= intBuffer;
    }
}

function rerender() {
    screen.innerText = buffer;
}