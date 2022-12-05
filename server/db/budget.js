const connection = require('./connection')

module.exports = {
  getBudgetByUserId,
  addBudget,
  updateBudget,
  deleteBudget,
}

function getBudgetByUserId(userId, db = connection) {
  return db('Budget')
    .where('user_id', userId)
    .select('id', 'name', 'start_date as startDate', 'end_date as endDate')
}

function addBudget(budget, db = connection) {
  return db('Budget').insert(budget, [
    'id',
    'name',
    'start_date as startDate',
    'end_date as endDate',
  ])
}

function updateBudget(id, budget, db = connection) {
  return db('Budget')
    .where({ id })
    .update(budget, [
      'id',
      'name',
      'start_date as startDate',
      'end_date as endDate',
    ])
}

function deleteBudget(id, db = connection) {
  return db('Budget').where({ id }).del()
}
