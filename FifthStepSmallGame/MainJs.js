let board = [1,2,3,4, 5,6,7,8, 9,10,11,12, 13,14,15,0];
let moves = 0;

function render() {
  const boardEl = document.getElementById('board');
  boardEl.innerHTML = '';

  board.forEach((num, i) => {
    const tile = document.createElement('div');
    if (num === 0) {
      tile.className = 'empty';
    } else {
      tile.className = 'tile';
      tile.textContent = num;
      tile.addEventListener('click', () => handleClick(i));
    }
    boardEl.appendChild(tile);
  });
}

function handleClick(index) {
  const emptyIndex = board.indexOf(0);
  const diff = Math.abs(index - emptyIndex);
  const sameRow = Math.floor(index / 4) === Math.floor(emptyIndex / 4);

  if (diff === 4 || (diff === 1 && sameRow)) {
    [board[index], board[emptyIndex]] = [board[emptyIndex], board[index]];
    moves++;
    document.getElementById('move-count').textContent = moves;
    render();
    checkWin();
  }
}

function checkWin() {
  const solved = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
  const won = board.every((num, i) => num === solved[i]);
  if (won) {
    document.getElementById('message').textContent = ' ';
  }
}

document.getElementById('shuffle-btn').addEventListener('click', () => {
  moves = 0;
  document.getElementById('move-count').textContent = 0;
  document.getElementById('message').textContent = '';

  for (let i = 0; i < 300; i++) {
    const emptyIndex = board.indexOf(0);
    const neighbors = [
      emptyIndex - 1,
      emptyIndex + 1,
      emptyIndex - 4,
      emptyIndex + 4
    ].filter(n => {
      if (n < 0 || n > 15) return false;
      if (Math.abs(n - emptyIndex) === 1) {
        return Math.floor(n / 4) === Math.floor(emptyIndex / 4);
      }
      return true;
    });

    const pick = neighbors[Math.floor(Math.random() * neighbors.length)];
    handleClick(pick);
  }
});

render();