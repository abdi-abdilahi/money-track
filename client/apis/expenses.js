import request from 'superagent'
const rootUrl = '/api/v1/expenses/'

export function getExpenses(budgetId) {
  return request
    .get(rootUrl + budgetId)
    .then((res) => res.body)
    .catch((err) => {
      return { message: err.message }
    })
}

export function addExpense(budgetId, expenses) {
  return request
    .post(rootUrl + budgetId)
    .send(expenses)
    .then((res) => res.body)
    .catch((err) => {
      return { message: err.message }
    })
}

export function updateExpense(expenseId, newExpense) {
  return request
    .patch(rootUrl + expenseId)
    .send(newExpense)
    .then((res) => res.body)
    .catch((err) => {
      return { message: err.message }
    })
}

export function deleteExpense(expenseId) {
  return request
    .delete(rootUrl + expenseId)
    .then((res) => res.status)
    .catch((err) => {
      return { message: err.message }
    })
}
