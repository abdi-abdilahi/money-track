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

function expenses(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case EXPENSES_PENDING:
      return { ...state, loading: true }
    case EXPENSES_REJECTED:
      return { ...state, loading: false, error: payload }
    case GET_EXPENSES_FULFILLED:
      return { ...state, loading: false, data: payload }
    case ADD_EXPENSE_FULFILLED:
      return { ...state, loading: false, data: [...state.data, payload] }
    case UPDATE_EXPENSE_FULFILLED:
      return {
        ...state,
        loading: false,
        data: state.data.map((expense) => {
          return expense.id === payload.oldExpenseId
            ? payload.newExpense
            : expense
        }),
      }
    case DELETE_EXPENSE_FULFILLED:
      return {
        ...state,
        loading: false,
        data: state.data.filter((expense) => expense.id !== payload),
      }
    default:
      return state
  }
}
export default expenses
