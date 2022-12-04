import {
  getIncomes,
  addIncome,
  updateIncome,
  deleteIncome,
} from '../apis/incomes'

export const INCOMES_PENDING = 'INCOMES_PENDING'
export const INCOMES_REJECTED = 'INCOMES_REJECTED'
export const GET_INCOMES_FULFILLED = 'GET_INCOMES_FULFILLED'
export const ADD_INCOME_FULFILLED = 'ADD_INCOME_FULFILLED'
export const UPDATE_INCOME_FULFILLED = 'UPDATE_INCOME_FULFILLED'
export const DELETE_INCOME_FULFILLED = 'DELETE_INCOME_FULFILLED'

function incomesPending() {
  return {
    type: INCOMES_PENDING,
  }
}

function incomesRejected(errorMessage) {
  return {
    type: INCOMES_REJECTED,
    payload: errorMessage,
  }
}

function getIncomesFulfilled(incomes) {
  return {
    type: GET_INCOMES_FULFILLED,
    payload: incomes,
  }
}

function addIncomeFulfilled(newIncome) {
  return {
    type: ADD_INCOME_FULFILLED,
    payload: newIncome,
  }
}

function updateIncomeFulfilled(oldIncomeId, newIncome) {
  return {
    type: UPDATE_INCOME_FULFILLED,
    payload: { oldIncomeId, newIncome },
  }
}

function deleteIncomeFulfilled(incomeId) {
  return {
    type: DELETE_INCOME_FULFILLED,
    payload: incomeId,
  }
}

export function fetchIncomes(budgetId) {
  return (dispatch) => {
    dispatch(incomesPending())
    return getIncomes(budgetId)
      .then((incomes) => {
        dispatch(getIncomesFulfilled(incomes))
      })
      .catch((err) => {
        dispatch(incomesRejected(err.message))
      })
  }
}

export function postIncomes(budgetId, newIncome) {
  return (dispatch) => {
    dispatch(incomesPending())
    return addIncome(budgetId, newIncome)
      .then((income) => {
        dispatch(addIncomeFulfilled(income))
      })
      .catch((err) => {
        dispatch(incomesRejected(err.message))
      })
  }
}

export function patchIncomes(oldIncomeId, newIncome) {
  return (dispatch) => {
    dispatch(incomesPending())
    return updateIncome(oldIncomeId, newIncome)
      .then((updatedIncome) => {
        dispatch(updateIncomeFulfilled(oldIncomeId, updatedIncome))
      })
      .catch((err) => {
        dispatch(incomesRejected(err.message))
      })
  }
}

export function delIncomes(incomeId) {
  return (dispatch) => {
    dispatch(incomesPending())
    return deleteIncome(incomeId)
      .then(() => {
        dispatch(deleteIncomeFulfilled(incomeId))
      })
      .catch((err) => {
        dispatch(incomesRejected(err.message))
      })
  }
}
