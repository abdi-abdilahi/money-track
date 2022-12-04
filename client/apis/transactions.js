import request from 'superagent'
const rootUrl = '/api/v1/transactions/'

export function getTransactions() {
  return request
    .get(rootUrl)
    .then((res) => res.body)
    .catch((err) => {
      return { message: err.message }
    })
}

export function addTransaction(newTransaction) {
  return request
    .post(rootUrl)
    .send(newTransaction)
    .then((res) => res.body)
    .catch((err) => {
      return { message: err.message }
    })
}

export function updateTransaction(transactionId, updatedTransaction) {
  return request
    .patch(rootUrl + transactionId)
    .send(updatedTransaction)
    .then((res) => res.body)
    .catch((err) => {
      return { message: err.message }
    })
}

export function deleteTransaction(transactionId) {
  return request
    .del(rootUrl + transactionId)
    .then((res) => res.status)
    .catch((err) => {
      return { message: err.message }
    })
}
