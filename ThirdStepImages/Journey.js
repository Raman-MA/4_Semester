
const tree = {
  age: 0,
  height: 0,
  treeAlive: true,
  numOranges: 0,

  OneYearPasses() {
    this.age += 1;
    this.height += 2;
    this.numOranges = this.age === 1 ? 0 : (this.age - 1) * 5;
    return `Year ${this.age}: height ${this.height}cm · ${this.numOranges} oranges.`;
  }
};

OneYearPasses() {
  if (!this.treeAlive) return "Tree esta muerte, buen trabajo, Cabrón.";
  this.age += 1;
  if (this.age < 80) this.height += 2;
  if (this.age >= 80) { this.treeAlive = false; return `Died at age ${this.age}.`; }
  this.numOranges = this.age === 1 ? 0 : (this.age - 1) * 5;
  return `Year ${this.age}: height ${this.height}cm · ${this.numOranges} oranges.`;
}


EatOrange(count) {
  if (!this.treeAlive)     return "Tree esta muerte, buen trabajo, Cabrón.";
  if (this.numOranges < 1) return "No oranges Hosé.";
  const ate = Math.min(count, this.numOranges);
  this.numOranges -= ate;
  this.orangesEaten += ate;
  return `Ate ${ate} orange(s). ${this.numOranges} left.`;
}