import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from '../apis/expenses'

export const EXPENSES_PENDING = 'EXPENSE_PENDING'
export const EXPENSES_REJECTED = 'EXPENSES_REJECTED'
export const GET_EXPENSES_FULFILLED = 'GET_EXPENSES_FULFILLED'
export const ADD_EXPENSE_FULFILLED = 'ADD_EXPENSE_FULFILLED'
export const UPDATE_EXPENSE_FULFILLED = 'UPDATE_EXPENSE_FULFILLED'
export const DELETE_EXPENSE_FULFILLED = 'DELETE_EXPENSE_FULFILLED'

function expensesPending() {
  return {
    type: EXPENSES_PENDING,
  }
}

function expensesRejected(errorMessage) {
  return {
    type: EXPENSES_REJECTED,
    payload: errorMessage,
  }
}

function getExpensesFulfilled(expenses) {
  return {
    type: GET_EXPENSES_FULFILLED,
    payload: expenses,
  }
}

function addExpenseFulfilled(expenses) {
  return {
    type: ADD_EXPENSE_FULFILLED,
    payload: expenses,
  }
}

function updateExpenseFulfilled(oldExpenseId, newExpense) {
  return {
    type: UPDATE_EXPENSE_FULFILLED,
    payload: { oldExpenseId, newExpense },
  }
}

function deleteExpenseFulfilled(id) {
  return {
    type: DELETE_EXPENSE_FULFILLED,
    payload: id,
  }
}

export function fetchExpenses(budgetId) {
  return (dispatch) => {
    dispatch(expensesPending())
    return getExpenses(budgetId)
      .then((expenses) => {
        dispatch(getExpensesFulfilled(expenses))
      })
      .catch((err) => {
        dispatch(expensesRejected(err.message))
      })
  }
}

export function postExpenses(budgetId, newExpenses) {
  return (dispatch) => {
    dispatch(expensesPending())
    return addExpense(budgetId, newExpenses)
      .then((expense) => {
        dispatch(addExpenseFulfilled(expense))
      })
      .catch((err) => {
        dispatch(expensesRejected(err.message))
      })
  }
}

export function patchExpense(oldExpenseId, newExpense) {
  return (dispatch) => {
    dispatch(expensesPending())
    return updateExpense(oldExpenseId, newExpense)
      .then((updatedExpense) => {
        dispatch(updateExpenseFulfilled(oldExpenseId, updatedExpense))
      })
      .catch((err) => {
        dispatch(expensesRejected(err.message))
      })
  }
}

export function delExpense(expenseId) {
  return (dispatch) => {
    dispatch(expensesPending())
    return deleteExpense(expenseId)
      .then(() => dispatch(deleteExpenseFulfilled(expenseId)))
      .catch((err) => {
        dispatch(expensesRejected(err.message))
      })
  }
}
