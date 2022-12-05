import {
  TRANSACTIONS_PENDING,
  TRANSACTIONS_REJECTED,
  GET_TRANSACTIONS_FULFILLED,
  ADD_TRANSACTION_FULFILLED,
  UPDATE_TRANSACTION_FULFILLED,
  DELETE_TRANSACTION_FULFILLED,
} from '../actions/transactions'

const initialState = {
  data: null,
  error: null,
  loading: false,
}

const transactions = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case TRANSACTIONS_PENDING:
      return { ...state, loading: true }
    case TRANSACTIONS_REJECTED:
      return { ...state, loading: false, error: payload }
    case GET_TRANSACTIONS_FULFILLED:
      return { ...state, loading: false, data: payload }

    case ADD_TRANSACTION_FULFILLED:
      return { ...state, loading: false, data: [...state.data, payload] }

    case UPDATE_TRANSACTION_FULFILLED:
      return {
        ...state,
        loading: false,
        data: state.data.map((transaction) => {
          return transaction.id === payload.oldTransactionId
            ? payload.newTransaction
            : transaction
        }),
      }

    case DELETE_TRANSACTION_FULFILLED:
      return {
        ...state,
        loading: false,
        data: state.data.filter((transaction) => transaction.id !== payload),
      }
    default:
      return state
  }
}

export default transactions
