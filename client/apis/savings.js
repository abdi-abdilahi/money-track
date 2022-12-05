import request from 'superagent'
const rootUrl = '/api/v1/savings/'

export function getSavings(budgetId) {
  return request
    .get(rootUrl + budgetId)
    .then((res) => res.body)
    .catch((err) => {
      return { message: err.message }
    })
}

export function addSavings(budgetId, newSaving) {
  return request
    .post(rootUrl + budgetId)
    .send(newSaving)
    .then((res) => res.body)
    .catch((err) => {
      return { message: err.message }
    })
}

export function updateSavings(savingId, updatedSaving) {
  return request
    .patch(rootUrl + savingId)
    .send(updatedSaving)
    .then((res) => res.body)
    .catch((err) => {
      return { message: err.message }
    })
}

export function deleteSavings(savingId) {
  return request
    .del(rootUrl + savingId)
    .then((res) => res.status)
    .catch((err) => {
      return { message: err.message }
    })
}
