const listOfNums = document.querySelectorAll(".number");
const listOfSigns = document.querySelectorAll(".sign");
const input = document.querySelector("#field");
const CalcBtn = document.querySelector(".calculate-btn");
const clearBtn = document.querySelector(".clear-btn");

let firstNum = 0;
let secondNum = 0;
let typedNum1 = "";
let typedNum2 = "";
let operator, colorSign, calcResult;

function numberClickedHandler(el) {
  if (operator) {
    colorSign.classList.remove("sign-color");
    typedNum2 += el.textContent;
    input.value = typedNum2;
    secondNum = parseInt(typedNum2);
    // console.log(`sec num - ${secondNum}`);
    CalcBtn.disabled = false;
    return;
  }

  if (clearBtn.classList.contains("error-color")) {
    clearBtn.classList.remove("error-color");
  }
  typedNum1 += el.textContent;
  input.value = typedNum1;
  firstNum = parseInt(typedNum1);
  // console.log(`first num - ${firstNum}`);
  CalcBtn.disabled = true;
}

function operatorClickedHandler(el) {
  if (operator) {
    return;
  }
  operator = el.textContent;
  // console.log(`operator - ${operator}`);
  el.classList.add("sign-color");
  colorSign = el;
  //   CalcBtn.disabled = false;
}

function add(n1, n2) {
  return (n1 + n2).toFixed(2);
}
function subst(n1, n2) {
  return (n1 - n2).toFixed(2);
}
function power(n1, n2) {
  return (n1 * n2).toFixed(2);
}
function divide(n1, n2) {
  if (n2 == 0) {
    return "Do not devide by 0!";
  }
  return (n1 / n2).toFixed(2);
}

function result(n1, n2, operator) {
  switch (operator) {
    case "+":
      return add(n1, n2);
    case "-":
      return subst(n1, n2);
    case "*":
      return power(n1, n2);
    case "/":
      return divide(n1, n2);
  }
}

function clearNumbers(calcResult = 0) {
  firstNum = calcResult;
  secondNum = 0;
  operator = null;
  typedNum1 = "";
  typedNum2 = "";
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

CalcBtn.addEventListener("click", () => {
  if (secondNum === undefined || secondNum === NaN) {
    return;
  }
  if (secondNum == 0 && operator == "/") {
    input.value = result(firstNum, secondNum, operator);
    // calcResult = result(firstNum, secondNum, operator);
    clearBtn.classList.add("error-color");
    clearNumbers(0);
    CalcBtn.disabled = true;
    return;
  }
  if(!operator) {
    return;
  }
  input.value = Number(result(firstNum, secondNum, operator));
  calcResult = Number(result(firstNum, secondNum, operator));
  clearNumbers(calcResult);
  CalcBtn.disabled = true;
});

clearBtn.addEventListener("click", () => {
  input.value = 0;
  clearNumbers(0);
  if (clearBtn.classList.contains("error-color")) {
    clearBtn.classList.remove("error-color");
  }
});
