import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from '../apis/transactions'

export const TRANSACTIONS_PENDING = 'TRANSACTIONS_PENDING'
export const TRANSACTIONS_REJECTED = 'TRANSACTIONS_REJECTED'
export const GET_TRANSACTIONS_FULFILLED = 'GET_TRANSACTIONS_FULFILLED'
export const ADD_TRANSACTION_FULFILLED = 'ADD_TRANSACTION_FULFILLED'
export const UPDATE_TRANSACTION_FULFILLED = 'UPDATE_TRANSACTION_FULFILLED'
export const DELETE_TRANSACTION_FULFILLED = 'DELETE_TRANSACTION_FULFILLED'

function transactionsPending() {
  return {
    type: TRANSACTIONS_PENDING,
  }
}

function transactionsRejected(errorMessage) {
  return {
    type: TRANSACTIONS_REJECTED,
    payload: errorMessage,
  }
}

function getTransactionsFulfilled(transactions) {
  return {
    type: GET_TRANSACTIONS_FULFILLED,
    payload: transactions,
  }
}

function addTransactionFulfilled(newTransaction) {
  return {
    type: ADD_TRANSACTION_FULFILLED,
    payload: newTransaction,
  }
}

function updateTransactionFulfilled(oldTransactionId, newTransaction) {
  return {
    type: UPDATE_TRANSACTION_FULFILLED,
    payload: { oldTransactionId, newTransaction },
  }
}

function deleteTransactionFulfilled(id) {
  return {
    type: DELETE_TRANSACTION_FULFILLED,
    payload: id,
  }
}

export function fetchTransactions() {
  return (dispatch) => {
    dispatch(transactionsPending())
    return getTransactions()
      .then((transactions) => {
        dispatch(getTransactionsFulfilled(transactions))
      })
      .catch((err) => {
        dispatch(transactionsRejected(err.message))
      })
  }
}

export function postTransaction(newTransaction) {
  return (dispatch) => {
    dispatch(transactionsPending())
    return addTransaction(newTransaction)
      .then((transaction) => {
        dispatch(addTransactionFulfilled(transaction))
      })
      .catch((err) => {
        dispatch(transactionsRejected(err.message))
      })
  }
}

export function patchTransaction(oldTransactionId, newTransaction) {
  return (dispatch) => {
    dispatch(transactionsPending())
    return updateTransaction(oldTransactionId, newTransaction)
      .then((updatedTransaction) => {
        dispatch(
          updateTransactionFulfilled(oldTransactionId, updatedTransaction)
        )
      })
      .catch((err) => {
        dispatch(transactionsRejected(err.message))
      })
  }
}

export function delTransaction(transactionId) {
  return (dispatch) => {
    dispatch(transactionsPending())
    return deleteTransaction(transactionId)
      .then(() => {
        dispatch(deleteTransactionFulfilled(transactionId))
      })
      .catch((err) => {
        dispatch(transactionsRejected(err.message))
      })
  }
}
