const connection = require('./connection')

module.exports = {
  getSavingsByBudgetId,
  addSaving,
  updateSaving,
  deleteSaving,
}

function getSavingsByBudgetId(budgetId, db = connection) {
  return db('Savings')
    .where('budget_id', budgetId)
    .select('id', 'name', 'amount', 'goal_date as goalDate')
}

function addSaving(newSaving, db = connection) {
  return db('Savings').insert(newSaving, [
    'id',
    'name',
    'amount',
    'goal_date as goalDate',
  ])
}

function updateSaving(id, saving, db = connection) {
  return db('Savings')
    .where({ id })
    .update(saving, ['id', 'name', 'amount', 'goal_date as goalDate'])
}

function deleteSaving(id, db = connection) {
  return db('Savings').where({ id }).del()
}
