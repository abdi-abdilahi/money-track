import request from 'superagent'
const rootUrl = '/api/v1/budget/'

export function getBudget() {
  return request
    .get(rootUrl)
    .then((res) => res.body)
    .catch((err) => {
      return { message: err.message }
    })
}

export function addBudget(newBudget) {
  return request
    .post(rootUrl)
    .send(newBudget)
    .then((res) => res.body)
    .catch((err) => {
      return { message: err.message }
    })
}

export function updateBudget(budgetId, updatedBudget) {
  return request
    .patch(rootUrl + budgetId)
    .send(updatedBudget)
    .then((res) => res.body)
    .catch((err) => {
      return { message: err.message }
    })
}

export function deleteBudget(budgetId) {
  return request
    .del(rootUrl + budgetId)
    .then((res) => res.status)
    .catch((err) => {
      return { message: err.message }
    })
}
