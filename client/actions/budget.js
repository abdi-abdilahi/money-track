import {
  getBudget,
  addBudget,
  updateBudget,
  deleteBudget,
} from '../apis/budget'

export const BUDGET_PENDING = 'BUDGET_PENDING'
export const BUDGET_REJECTED = 'BUDGET_REJECTED'
export const GET_BUDGET_FULFILLED = 'GET_BUDGET_FULFILLED'
export const ADD_BUDGET_FULFILLED = 'ADD_BUDGET_FULFILLED'
export const UPDATE_BUDGET_FULFILLED = 'UPDATE_BUDGET_FULFILLED'
export const DELETE_BUDGET_FULFILLED = 'DELETE_BUDGET_FULFILLED'

function budgetPending() {
  return {
    type: BUDGET_PENDING,
  }
}

function budgetRejected(errorMessage) {
  return {
    type: BUDGET_REJECTED,
    payload: errorMessage,
  }
}

function getBudgetFulfilled(budget) {
  return {
    type: GET_BUDGET_FULFILLED,
    payload: budget,
  }
}

function addBudgetFulfilled(newBudget) {
  return {
    type: ADD_BUDGET_FULFILLED,
    payload: newBudget,
  }
}

function updateBudgetFulfilled(oldBudgetId, newBudget) {
  return {
    type: UPDATE_BUDGET_FULFILLED,
    payload: { oldBudgetId, newBudget },
  }
}

function deleteBudgetFulfilled(budgetId) {
  return {
    type: DELETE_BUDGET_FULFILLED,
    payload: budgetId,
  }
}

export function fetchBudget() {
  return (dispatch) => {
    dispatch(budgetPending())
    return getBudget()
      .then((budget) => {
        dispatch(getBudgetFulfilled(budget))
      })
      .catch((err) => {
        dispatch(budgetRejected(err.message))
      })
  }
}

export function postBudget(newIncome) {
  return (dispatch) => {
    dispatch(budgetPending())
    return addBudget(newIncome)
      .then((budget) => {
        dispatch(addBudgetFulfilled(budget))
      })
      .catch((err) => {
        dispatch(budgetRejected(err.message))
      })
  }
}

export function patchBudget(oldBudgetId, newBudget) {
  return (dispatch) => {
    dispatch(budgetPending())
    return updateBudget(oldBudgetId, newBudget)
      .then((updatedBudget) => {
        dispatch(updateBudgetFulfilled(oldBudgetId, updatedBudget))
      })
      .catch((err) => {
        dispatch(budgetRejected(err.message))
      })
  }
}

export function delBudget(budgetId) {
  return (dispatch) => {
    dispatch(budgetPending())
    return deleteBudget(budgetId)
      .then(() => {
        dispatch(deleteBudgetFulfilled(budgetId))
      })
      .catch((err) => {
        dispatch(budgetRejected(err.message))
      })
  }
}
