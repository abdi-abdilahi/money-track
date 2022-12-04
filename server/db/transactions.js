const connection = require('./connection')

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
}

function getTransactions(db = connection) {
  return db('Transactions').select(
    'id',
    'name',
    'amount',
    'date_created as dateCreated',
    'expenses_id as expensesId'
  )
}

function addTransaction(newTransaction, db = connection) {
  return db('Transactions').insert(newTransaction, [
    'id',
    'name',
    'amount',
    'date_created as dateCreated',
    'expenses_id as expensesId',
  ])
}

function updateTransaction(id, updatedTransaction, db = connection) {
  return db('Transactions')
    .where({ id })
    .update(updatedTransaction, [
      'id',
      'name',
      'amount',
      'date_created as dateCreated',
      'expenses_id as expensesId',
    ])
}

function deleteTransaction(id, db = connection) {
  return db('Transactions').where({ id }).del()
}
