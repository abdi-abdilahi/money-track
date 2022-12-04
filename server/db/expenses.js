const connection = require('./connection')

module.exports = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
}

function getExpenses(budgetId, db = connection) {
  return db('Expenses')
    .where('budget_id', budgetId)
    .select('id', 'name', 'amount')
}

function addExpense(newExpense, db = connection) {
  return db('Expenses').insert(newExpense, ['id', 'name', 'amount'])
}

function updateExpense(id, expense, db = connection) {
  return db('Expenses').where({ id }).update(expense, ['id', 'name', 'amount'])
}

function deleteExpense(id, db = connection) {
  return db('Expenses').where({ id }).del()
}
