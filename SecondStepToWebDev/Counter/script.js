const counterDisplay = document.getElementById('counter');
const incrementBtn = document.getElementById('incrementBtn');

let count = 0;

function updateDisplay() {
    counterDisplay.textContent = count;
}

function increment() {
    count++;
    updateDisplay();
}

incrementBtn.addEventListener('click', increment);
