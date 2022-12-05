import {
  BUDGET_PENDING,
  BUDGET_REJECTED,
  GET_BUDGET_FULFILLED,
  ADD_BUDGET_FULFILLED,
  UPDATE_BUDGET_FULFILLED,
  DELETE_BUDGET_FULFILLED,
} from '../actions/budget'

const initialState = {
  data: null,
  error: null,
  loading: false,
}

const budget = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case BUDGET_PENDING:
      return { ...state, loading: true }
    case BUDGET_REJECTED:
      return { ...state, loading: false, error: payload }
    case GET_BUDGET_FULFILLED:
      return { ...state, loading: false, data: payload }
    case ADD_BUDGET_FULFILLED:
      return { ...state, loading: false, data: [...state.data, payload] }
    case UPDATE_BUDGET_FULFILLED:
      return {
        ...state,
        loading: false,
        data: state.data.map((income) => {
          return income.id === payload.oldBudgetId ? payload.newBudget : income
        }),
      }
    case DELETE_BUDGET_FULFILLED:
      return {
        ...state,
        loading: false,
        data: state.data.filter((income) => income.id !== payload),
      }
    default:
      return state
  }
}

export default budget
