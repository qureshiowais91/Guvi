const display = document.querySelector(".display");
const col9Container = document.querySelector(".col-9");

document.addEventListener("keydown", (event) => {
  const key = event.key;
  const regex = /^(?!.*\.\.)[0-9./*+\-]|Backspace|Enter$/;

  if (!regex.test(key)) {
    event.preventDefault();
    alert("Only Number Are Allowed")
  }else{
    if (key === "=" || key === "Enter") {
      event.preventDefault();
      evaluateExpression();
    } else if (key === "Backspace") {
      event.preventDefault();
      handleBackspace();
    } else if (key === ".") {
      event.preventDefault();
      handleDecimalPoint();
    }else{
      display.value += key;
    }
  } 
  
 
});
// event daligation 
col9Container.addEventListener("click", function (event) {
  const clickedButton = event.target;

  if (clickedButton.classList.contains("btnC")) {
    clearDisplay();
  } else if (clickedButton.classList.contains("btnmp")) {
    performMemoryOperation("+");
  } else if (clickedButton.classList.contains("btnmm")) {
    performMemoryOperation("-");
  } else if (clickedButton.classList.contains("btnm")) {
    display.value += "*";
  } else if (clickedButton.classList.contains("btndiv")) {
    display.value += "/";
  } else if (clickedButton.classList.contains("btnmod")) {
    display.value += "%";
  } else if (/^[0-9]$/.test(clickedButton.innerText)) {
    display.value += clickedButton.innerText; // 0-9 using regex
  } else if (clickedButton.classList.contains("btnplus")) {
    display.value += "+";
  } else if (clickedButton.classList.contains("btnmins")) {
    display.value += "-";
  } else if (clickedButton.classList.contains("btnpoint")) {
    handleDecimalPoint();
  } else if (clickedButton.classList.contains("btneq")) {
    evaluateExpression();
  }
});

function clearDisplay() {
  display.value = "";
  localStorage.removeItem("value");
  localStorage.removeItem("operation");
}

function handleBackspace() {
  display.value = display.value.slice(0, -1);
}

function handleDecimalPoint() {
 const regex = /.*\..*\..*/;
    display.value += ".";
}

function performMemoryOperation(operation) {
  if (parseInt(display.value)) {
    const value = Number(display.value);
    const memoryValue = Number(localStorage.getItem("value")) || 0;

    if (localStorage.getItem("operation") === operation) {
      localStorage.setItem("value", memoryValue + value);
    } else {
      localStorage.setItem("value", value);
      localStorage.setItem("operation", operation);
    }
  }
}

function evaluateExpression() {
  try {
    const memoryValue = Number(localStorage.getItem("value")) || 0;
    const expression = display.value;
    const result = eval(expression) + memoryValue;

    display.value = result;
    localStorage.removeItem("value");
    localStorage.removeItem("operation");
  } catch (error) {
    display.value = "Error";
  }
}
