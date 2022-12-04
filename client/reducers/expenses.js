import {
  EXPENSES_PENDING,
  EXPENSES_REJECTED,
  GET_EXPENSES_FULFILLED,
  ADD_EXPENSE_FULFILLED,
  UPDATE_EXPENSE_FULFILLED,
  DELETE_EXPENSE_FULFILLED,
} from '../actions/expenses'

const initialState = {
  data: null,
  error: undefined,
  loading: false,
}

const expenses = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case EXPENSES_PENDING:
      return { ...state, loading: true }
    case EXPENSES_REJECTED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
export default expenses
