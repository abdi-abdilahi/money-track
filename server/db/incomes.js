const connection = require('./connection')

module.exports = {
  getIncomesByBudgetId,
  addIncomes,
  updateIncome,
  deleteIncome,
}

function getIncomesByBudgetId(budgetId, db = connection) {
  return db('Incomes')
    .where('budget_id', budgetId)
    .select(
      'id',
      'name',
      'amount',
      'start_date as startDate',
      'end_date as endDate'
    )
}

function addIncomes(incomes, db = connection) {
  return db('Incomes').insert(incomes, [
    'id',
    'name',
    'amount',
    'start_date as startDate',
    'end_date as endDate',
  ])
}

function updateIncome(id, newIncome, db = connection) {
  return db('Incomes')
    .where({ id })
    .update(newIncome, [
      'id',
      'name',
      'amount',
      'start_date as startDate',
      'end_date as endDate',
    ])
}

function deleteIncome(id, db = connection) {
  return db('Incomes').where({ id }).del()
}
