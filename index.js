// basic operations
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

// get the elements from the html file
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");
const screen = document.querySelector(".screen")
const soundEffect = document.getElementById('soundEffect');

let currentInput = ''; // Store the current input

// add an event listener on each number button and show it later on the screen
for (let i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener('click', () => {
    const numberText = numberButtons[i].textContent;
    currentInput += numberText;
    screen.textContent = currentInput;
    soundEffect.play();

    //add some special style when the button is clicked
    numberButtons[i].style.cssText = "background-color: rgb(117, 85, 85); color: white;"
    setTimeout(() => {
      numberButtons[i].style.cssText = 'background-color: white; color:black;';
    }, 150);
  });
}
// add an event listener on each operation button and show it later on the screen
for (let i = 0; i < operationButtons.length; i++) {
  operationButtons[i].addEventListener('click', () => {
    const operationText = operationButtons[i].textContent;
    currentInput += ' ' + operationText + ' ';
    screen.textContent = currentInput;

    soundEffect.play();
    //add some special style when the button is clicked
    operationButtons[i].style.cssText = "background-color: rgb(117, 85, 85); color: white;"
    setTimeout(() => {
      operationButtons[i].style.cssText = 'background-color: white; color:black;';
    }, 150);
  });
}

// allow the clear button to delete everything on screen
clearButton.addEventListener('click', () => {
  currentInput = '';
  screen.textContent = '';

  soundEffect.play();
  //add some special style when the button is clicked
  clearButton.style.cssText = "background-color: rgb(117, 85, 85); color: white;"
  setTimeout(() => {
    clearButton.style.cssText = 'background-color: white; color:black;';
  }, 150);
})

// we finaly add an event listener to the equals button
equalsButton.addEventListener('click', () => {
  soundEffect.play();
  if (currentInput) {
    try {
      // calculate the result and show it on screen
      const result = calculate(currentInput);
      screen.textContent = result;
      currentInput = result.toString();
    } catch (error) {
      // if there's any error we'll display "Error"
      screen.textContent = 'Error';
      currentInput = '';
    }
  }
});

// function to calculate the result of the expression
function calculate(expression) {
  const operators = ['+', '-', '*', '/'];
  const tokens = expression.split(' ');

  let result = parseFloat(tokens[0]);
  let currentOperator = null;

  // we iterate through the tokens array to check if the current token is either an operator or a number
  for (let i = 1; i < tokens.length; i++) {
    if (operators.includes(tokens[i])) {
      currentOperator = tokens[i];
      // console.log(tokens); // we'll have something like tokens = ['3','+', '6', '-'......]
    } else {
      const number = parseFloat(tokens[i]);

      // we perform the appropriate operation based on the operator
      switch (currentOperator) {
        case '+':
          result += number;
          break;
        case '-':
          result -= number;
          break;
        case '*':
          result *= number;
          break;
        case '/':
          if (number !== 0) {
            result /= number;
          } else {
            throw new Error('Division by zero');
          }
          break;
        default:
          throw new Error('Invalid operator');
      }
    }
  }
  return result;
};
