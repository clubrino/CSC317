const display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operator = null;
let resetNext = false;

// Update display
function updateDisplay() {
    display.textContent = currentInput;
}

// Handle number or decimal
function appendNumber(num) {
    if (resetNext) {
        currentInput = num === '.' ? '0.' : num;
        resetNext = false;
    } else if (num === '.' && currentInput.includes('.')) {
        return;
    } else {
        currentInput = currentInput === '0' && num !== '.' ? num : currentInput + num;
    }
    updateDisplay();
}

// Handle operator
function chooseOperator(op) {
    if (operator && !resetNext) {
        compute();
    }
    operator = op;
    previousInput = currentInput;
    resetNext = true;
}

// Compute result
function compute() {
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return;

    let result;
    switch (operator) {
        case '+': result = prev + curr; break;
        case '-': result = prev - curr; break;
        case '*': result = prev * curr; break;
        case '/':
            result = curr === 0 ? 'Error' : prev / curr;
            break;
        default: return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    resetNext = true;
    updateDisplay();
}

// Clear (AC)
function clear() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    resetNext = false;
    updateDisplay();
}

// Toggle +/-
function toggleSign() {
    if (currentInput !== '0') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    }
}

// Percentage
function percent() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

// Button click events
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.dataset.key;

        if (!isNaN(key) || key === '.') {
            appendNumber(key);
        } else if (['+', '-', '*', '/'].includes(key)) {
            chooseOperator(key);
        } else if (key === '=') {
            compute();
        } else if (key === 'ac') {
            clear();
        } else if (key === 'plus-minus') {
            toggleSign();
        } else if (key === 'percent') {
            percent();
        }
    });
});

// Keyboard input support
document.addEventListener('keydown', (e) => {
    if (!isNaN(e.key) || e.key === '.') {
        appendNumber(e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        chooseOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        compute();
    } else if (e.key.toLowerCase() === 'c') {
        clear();
    } else if (e.key === '%') {
        percent();
    }
});
