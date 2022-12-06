import {
  getSavings,
  addSavings,
  updateSavings,
  deleteSavings,
} from '../apis/savings'

export const SAVINGS_PENDING = 'SAVINGS_PENDING'
export const SAVINGS_REJECTED = 'SAVINGS_REJECTED'
export const GET_SAVINGS_FULFILLED = 'GET_SAVINGS_FULFILLED'
export const ADD_SAVINGS_FULFILLED = 'ADD_SAVINGS_FULFILLED'
export const UPDATE_SAVINGS_FULFILLED = 'UPDATE_SAVINGS_FULFILLED'
export const DELETE_SAVINGS_FULFILLED = 'DELETE_SAVINGS_FULFILLED'

function savingsPending() {
  return {
    type: SAVINGS_PENDING,
  }
}

function savingsRejected(errorMessage) {
  return {
    type: SAVINGS_REJECTED,
    payload: errorMessage,
  }
}

function getSavingsFulfilled(savings) {
  return {
    type: GET_SAVINGS_FULFILLED,
    payload: savings,
  }
}

function addSavingsFulfilled(newSavings) {
  return {
    type: ADD_SAVINGS_FULFILLED,
    payload: newSavings,
  }
}

function updateSavingsFulfilled(oldSavingsId, newSavings) {
  return {
    type: UPDATE_SAVINGS_FULFILLED,
    payload: { oldSavingsId, newSavings },
  }
}

function deleteSavingsFulfilled(savingsId) {
  return {
    type: DELETE_SAVINGS_FULFILLED,
    payload: savingsId,
  }
}

export function fetchSavings(budgetId) {
  return (dispatch) => {
    dispatch(savingsPending())
    return getSavings(budgetId)
      .then((savings) => {
        dispatch(getSavingsFulfilled(savings))
      })
      .catch((err) => {
        dispatch(savingsRejected(err.message))
      })
  }
}

export function postSavings(budgetId, newSaving) {
  return (dispatch) => {
    dispatch(savingsPending())
    return addSavings(budgetId, newSaving)
      .then((savings) => {
        dispatch(addSavingsFulfilled(savings))
      })
      .catch((err) => {
        dispatch(savingsRejected(err.message))
      })
  }
}

export function patchSavings(oldSavingsId, newSavings) {
  return (dispatch) => {
    dispatch(savingsPending())
    return updateSavings(oldSavingsId, newSavings)
      .then((updatedSavings) => {
        dispatch(updateSavingsFulfilled(oldSavingsId, updatedSavings))
      })
      .catch((err) => {
        dispatch(savingsRejected(err.message))
      })
  }
}

export function delSavings(savingsId) {
  return (dispatch) => {
    dispatch(savingsPending())
    return deleteSavings(savingsId)
      .then(() => {
        dispatch(deleteSavingsFulfilled(savingsId))
      })
      .catch((err) => {
        dispatch(savingsRejected(err.message))
      })
  }
}
