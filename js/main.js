let screen = document.getElementById('screen');
let buttons = document.querySelectorAll('.btn');
let clearButton = document.getElementById('clear');
let equalsButton = document.getElementById('equals');
let currentExpression = '';

//events on buttons
buttons.forEach(button => {
    button.addEventListener('click', function () {
        let value = button.getAttribute('data-value');
        if (value) {
            currentExpression += value;
            screen.value = currentExpression;
            console.log(currentExpression);
        }
    });
});


// clear (c)
clearButton.addEventListener('click', function () {
    currentExpression = '';
    screen.value = '';
});

/*
// eval 
equalsButton.addEventListener('click', function() {
    try {
        
        let result = eval(currentExpression);
        currentExpression = result.toString();
        screen.value = currentExpression;
    } catch (e) {
        screen.value = 'Error';
    }
});
*/


// equals (=)
equalsButton.addEventListener('click', function () {

    
    try {
        let result = calculate(currentExpression);
        screen.value = result; // display
        currentExpression = result.toString(); // for next process
    } catch (error) {
        screen.value = 'Error';
        currentExpression = '';
    }
});

// calculate
function calculate(expression) {
    expression = expression.replace(/\s+/g, '');

    if (!expression) throw 'Empty Expression';
    if (/[*+/\-]{2,}/.test(expression)) throw 'Invalid Expression';


    try{

        let operators = [];
        let numbers = [];
        let currentNumber = '';

        // split numbers and operators
        for (let char of expression) {
            if ('+-*/'.includes(char)) {
                if (currentNumber === '') throw 'Invalid Expression'; // operator without number before
                numbers.push(parseFloat(currentNumber)); // converts string to number + add to numbers
                operators.push(char);
                currentNumber = '';
            } else {
                currentNumber += char; // +=digits
            }
        }
        if (currentNumber === '') throw 'Invalid Expression'; // operator without number after
        numbers.push(parseFloat(currentNumber)); // last number


        // * , /
        let i = 0;
        while (i < operators.length) {
            if (operators[i] === '*' || operators[i] === '/') {
                let result = operators[i] === '*' ? numbers[i] * numbers[i + 1] : numbers[i] / numbers[i + 1];
                if (operators[i] === '/' && numbers[i + 1] === 0) {
                    throw 'Division by zero';
                }
                numbers.splice(i, 2, result); // replace 2 numbers with result
                operators.splice(i, 1); // remove operator
            } else {
                i++; // +,-
            }
        }

        // + , -
        while (operators.length) {
            let result = operators[0] === '+' ? numbers[0] + numbers[1] : numbers[0] - numbers[1];
            numbers.splice(0, 2, result);
        }

        return numbers[0]; // final result
    } catch (error) {
        throw 'Invalid Expression';
    }

}
