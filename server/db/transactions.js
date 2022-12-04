const connection = require('./connection')

module.exports = {
  getTransactions,
  getTransactionById,
  addTransaction,
  updateTransaction,
  deleteTransaction,
}

function getTransactions(db = connection) {
  return db('Transactions')
    .join('Expenses', 'Transactions.expenses_id', 'Expenses.id')
    .select(
      'Transactions.id',
      'Transactions.name',
      'Transactions.amount',
      'Transactions.date_created as dateCreated',
      'Transactions.expenses_id as expensesId',
      'Expenses.name as expensesName'
    )
}

function getTransactionById(id, db = connection) {
  return db('Transactions')
    .join('Expenses', 'Transactions.expenses_id', 'Expenses.id')
    .where('Transactions.id', id)
    .select(
      'Transactions.id',
      'Transactions.name',
      'Transactions.amount',
      'Transactions.date_created as dateCreated',
      'Transactions.expenses_id as expensesId',
      'Expenses.name as expensesName'
    )
    .first()
}

function addTransaction(newTransaction, db = connection) {
  return db('Transactions').insert(newTransaction, ['id'])
}

function updateTransaction(id, updatedTransaction, db = connection) {
  return db('Transactions').where({ id }).update(updatedTransaction)
}

function deleteTransaction(id, db = connection) {
  return db('Transactions').where({ id }).del()
}
