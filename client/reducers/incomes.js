import {
  INCOMES_PENDING,
  INCOMES_REJECTED,
  GET_INCOMES_FULFILLED,
  ADD_INCOME_FULFILLED,
  UPDATE_INCOME_FULFILLED,
  DELETE_INCOME_FULFILLED,
} from '../actions/incomes'

const initialState = {
  data: null,
  error: null,
  loading: false,
}

const incomes = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case INCOMES_PENDING:
      return { ...state, loading: true }
    case INCOMES_REJECTED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}

export default incomes
