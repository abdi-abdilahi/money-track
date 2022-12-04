import request from 'superagent'
const rootUrl = '/api/v1/incomes/'

export function getIncomes(budgetId) {
  return request
    .get(rootUrl + budgetId)
    .then((res) => res.body)
    .catch((err) => {
      return { message: err.message }
    })
}

export function addIncome(budgetId, newIncome) {
  return request
    .post(rootUrl + budgetId)
    .send(newIncome)
    .then((res) => res.body)
    .catch((err) => {
      return { message: err.message }
    })
}

export function updateIncome(incomeId, updatedIncome) {
  return request
    .patch(rootUrl + incomeId)
    .send(updatedIncome)
    .then((res) => res.body)
    .catch((err) => {
      return { message: err.message }
    })
}

export function deleteIncome(incomeId) {
  return request
    .del(rootUrl + incomeId)
    .then((res) => res.status)
    .catch((err) => {
      return { message: err.message }
    })
}
