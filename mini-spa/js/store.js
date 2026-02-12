export const store = {
  expenses: JSON.parse(localStorage.getItem("expenses")) || [],

  save() {
    localStorage.setItem("expenses", JSON.stringify(this.expenses));
  },

  add(expense) {
    this.expenses.push(expense);
    this.save();
  },

  remove(id) {
    this.expenses = this.expenses.filter(e => e.id !== id);
    this.save();
  },

  total() {
    return this.expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  }
};
