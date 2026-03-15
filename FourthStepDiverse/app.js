const tree = {
  age: 0, height: 0, treeAlive: true, numOranges: 0, orangesEaten: 0,

  getAge()  { return this.age; },
  getHeight()   { return this.height; },
  getTreeAlive()  { return this.treeAlive; },
  getNumOranges()  { return this.numOranges; },
  getOrangesEaten()   { return this.orangesEaten; },

  setAge(x)       { this.age = x; },
  setHeight(x)    { this.height = x; },
  setTreeAlive(x) { this.treeAlive = x; },

  OneYearPasses() {
    if (!this.treeAlive) return "Tree esta muerte, buen trabajo, Cabrón.";
    this.age += 1;
    if (this.age < 80) this.height += 2;
    if (this.age >= 80) { this.treeAlive = false; return `Died at age ${this.age}.`; }
    this.numOranges = this.age === 1 ? 0 : (this.age - 1) * 5;
    return `Year ${this.age}: height ${this.height}cm · ${this.numOranges} oranges.`;
  },

  EatOrange(count) {
    if (!this.treeAlive)     return "Tree esta muerte, buen trabajo, Cabrón.";
    if (this.numOranges < 1) return "No oranges Hosé.";
    const ate = Math.min(count, this.numOranges);
    this.numOranges -= ate;
    this.orangesEaten += ate;
    return `Ate ${ate} orange(s). ${this.numOranges} left.`;
  }
};

function getTreeEmoji() {
  if (!tree.getTreeAlive())   return "🪵"; 
  if (tree.getNumOranges() > 0) return "🍊";
  return "🌳";                                
}

function updateUI() {
  document.getElementById('treeImage').textContent   = getTreeEmoji();
  document.getElementById('statAge').textContent     = tree.getAge();
  document.getElementById('statHeight').textContent  = tree.getHeight();
  document.getElementById('statOranges').textContent = tree.getNumOranges();
  document.getElementById('statEaten').textContent   = tree.getOrangesEaten();
}

function log(msg) {
  const li = document.createElement('li');
  li.textContent = msg;
  document.getElementById('logList').prepend(li);
}

document.getElementById('btnYear').addEventListener('click', () => {
  const msg = tree.OneYearPasses();
  updateUI();
  log(msg);
});

document.getElementById('btnEat').addEventListener('click', () => {
  const count = parseInt(document.getElementById('eatInput').value) || 1;
  const msg = tree.EatOrange(count);
  updateUI();
  log(msg);
});

document.getElementById('btnReset').addEventListener('click', () => {
  tree.age = 0; tree.height = 0; tree.treeAlive = true;
  tree.numOranges = 0; tree.orangesEaten = 0;
  document.getElementById('logList').innerHTML = '';
  updateUI();
  log("Tree reset.");
});

updateUI();
log("Orange tree pulled up yo");
