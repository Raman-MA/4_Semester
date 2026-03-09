const display = document.getElementById('display');

function appendToDisplay(value) {
  if (display.value === '0' && value !== '.') {
    display.value = value;
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  display.value = '0';
}

function calculate() {

  try {
    let expression = display.value;

    let result = eval(expression);
    display.value = result;
  } catch (error) {
    display.value = 'Error';
  }
}
