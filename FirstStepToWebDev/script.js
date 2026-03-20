const green = document.getElementById('green');
const red = document.getElementById('red');
const blue = document.getElementById('blue');
const colorCode = document.getElementById('colorCode');
const body = document.body;

const colors = {
    green: '#28a745',
    red: '#dc3545',
    blue: '#007bff'
};

function setBackgroundColor(color) {
    body.style.backgroundColor = color;
    colorCode.textContent = `Color: ${color}`;
}

green.addEventListener('click', () => setBackgroundColor(colors.green));
red.addEventListener('click', () => setBackgroundColor(colors.red));
blue.addEventListener('click', () => setBackgroundColor(colors.blue));
