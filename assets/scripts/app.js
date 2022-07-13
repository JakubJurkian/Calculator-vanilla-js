const listOfNums = document.querySelectorAll(".number");
const listOfSigns = document.querySelectorAll(".sign");
const input = document.querySelector("#field");
const calcBtn = document.querySelector(".calculate-btn");
const clearBtn = document.querySelector(".clear-btn");

let firstNum = 0, secondNum = null;
let typedFirstNum = "", typedSecondNum = "";
let operator, colorSign, calcResult;

function numberClickedHandler(el) {
  if (operator) {
    colorSign.classList.remove("sign-color");
    typedSecondNum += el.textContent;
    input.value = typedSecondNum;
    secondNum = parseInt(typedSecondNum);
    // console.log(`sec num - ${secondNum}`);
    calcBtn.disabled = false;
    return;
  }

  if (clearBtn.classList.contains("error-color")) {
    clearBtn.classList.remove("error-color");
  }

  typedFirstNum += el.textContent;
  input.value = typedFirstNum;
  firstNum = parseInt(typedFirstNum);
  // console.log(`first num - ${firstNum}`);
  calcBtn.disabled = true;

  if (firstNum.toString().length < 15) {
    input.classList.remove('input-big-numbers');
  }
}

function operatorClickedHandler(el) {
  if (operator === el.textContent && !secondNum) {
    if (secondNum === 0) {
      return;
    }
    colorSign.classList.remove("sign-color");
    operator = null;
    return;
  }
  
  if (operator) return;

  if (clearBtn.classList.contains("error-color")) {
    clearBtn.classList.remove("error-color");
  }
  
  operator = el.textContent;
  // console.log(`operator - ${operator}`);
  el.classList.add("sign-color");
  colorSign = el;
}

const add = (n1, n2) => (n1 + n2).toFixed(2);
const subst = (n1, n2) => (n1 - n2).toFixed(2);
const power = (n1, n2) => (n1 * n2).toFixed(2);
const divide = (n1, n2) => {
  if (n2 == 0) return "Error";
  return (n1 / n2).toFixed(2);
}

function result(n1, n2, operator) {
  switch (operator) {
    case "+": return add(n1, n2);
    case "-": return subst(n1, n2);
    case "*": return power(n1, n2);
    case "/": return divide(n1, n2);
  }
}

function clearNumbers(calcResult = 0) {
  firstNum = calcResult;
  secondNum = null;
  operator = null;
  typedFirstNum = "";
  typedSecondNum = "";
  calcBtn.disabled = true;
  if (colorSign) {
    colorSign.classList.remove("sign-color");
  }
}

for (const el of listOfNums) {
  el.addEventListener("click", numberClickedHandler.bind(null, el));
}

for (const el of listOfSigns) {
  el.addEventListener("click", operatorClickedHandler.bind(null, el));
}

calcBtn.addEventListener("click", () => {
  // if (secondNum === undefined || secondNum === NaN) return;

  if(!operator) return;

  if (secondNum == 0 && operator == "/") {
    input.value = result(firstNum, secondNum, operator);
    clearBtn.classList.add("error-color");
    calcBtn.disabled = true;
    clearNumbers(0);
    return;
  }
  
  if (Number(result(firstNum, secondNum, operator)).toString().length > 13) {
    input.classList.add('input-big-numbers');
  }

  input.value = Number(result(firstNum, secondNum, operator));
  calcResult = Number(result(firstNum, secondNum, operator));
  clearNumbers(calcResult);
  calcBtn.disabled = true;
});

clearBtn.addEventListener("click", () => {
  input.value = 0;
  clearNumbers(0);
  if (clearBtn.classList.contains("error-color")) {
    clearBtn.classList.remove("error-color");
  }
  if (input.classList.contains('input-big-numbers')) {
    input.classList.remove('input-big-numbers');
  }
});