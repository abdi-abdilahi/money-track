import {
  SAVINGS_PENDING,
  SAVINGS_REJECTED,
  GET_SAVINGS_FULFILLED,
  ADD_SAVINGS_FULFILLED,
  UPDATE_SAVINGS_FULFILLED,
  DELETE_SAVINGS_FULFILLED,
} from '../actions/savings'

const initialState = {
  data: null,
  error: null,
  loading: false,
}

const savings = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SAVINGS_PENDING:
      return { ...state, loading: true }
    case SAVINGS_REJECTED:
      return { ...state, loading: false, error: payload }
    case GET_SAVINGS_FULFILLED:
      return { ...state, loading: false, data: payload }
    case ADD_SAVINGS_FULFILLED:
      return { ...state, loading: false, data: [...state.data, payload] }
    case UPDATE_SAVINGS_FULFILLED:
      return {
        ...state,
        loading: false,
        data: state.data.map((saving) => {
          return saving.id === payload.oldSavingsId
            ? payload.newSavings
            : saving
        }),
      }
    case DELETE_SAVINGS_FULFILLED:
      return {
        ...state,
        loading: false,
        data: state.data.filter((saving) => saving.id !== payload),
      }
    default:
      return state
  }
}

export default savings
