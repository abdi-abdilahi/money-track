import request from 'superagent'
const rootUrl = '/api/v1/saving/'

export function getSavings() {
  return request
    .get(rootUrl)
    .then((res) => res.body)
    .catch((err) => {
      return { message: err.message }
    })
}

export function addSavings(newSaving) {
  return request
    .post(rootUrl)
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
