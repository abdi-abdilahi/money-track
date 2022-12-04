import transactions from '../transactions'
import {
  TRANSACTIONS_PENDING,
  TRANSACTIONS_REJECTED,
  GET_TRANSACTIONS_FULFILLED,
  ADD_TRANSACTION_FULFILLED,
  UPDATE_TRANSACTION_FULFILLED,
  DELETE_TRANSACTION_FULFILLED,
} from '../../actions/transactions'

describe('incomes reducer', () => {
  const mockData = [
    {
      id: 1,
      name: 'PakNSave',
      amount: 1000,
    },
  ]

  const initialState = {
    loading: false,
    error: null,
    data: mockData,
  }

  it('should return correct state for TRANSACTIONS_PENDING', () => {
    const action = {
      type: TRANSACTIONS_PENDING,
    }

    const expectedState = {
      ...initialState,
      loading: true,
    }

    const outputState = transactions(initialState, action)
    expect(outputState).toEqual(expectedState)
  })

  it('should return correct state for TRANSACTIONS_REJECTED', () => {
    const action = {
      type: TRANSACTIONS_REJECTED,
      payload: 'mockErrorMessage',
    }

    const expectedState = {
      ...initialState,
      error: 'mockErrorMessage',
    }

    const outputState = transactions(initialState, action)
    expect(outputState).toEqual(expectedState)
  })

  it('should return correct state for GET_TRANSACTIONS_FULFILLED', () => {
    const action = {
      type: GET_TRANSACTIONS_FULFILLED,
      payload: mockData,
    }

    const expectedState = {
      ...initialState,
      data: mockData,
    }

    const outputState = transactions(initialState, action)
    expect(outputState).toEqual(expectedState)
  })

  it('should return correct state for ADD_TRANSACTION_FULFILLED', () => {
    const newTransactions = { id: 2, name: 'Z Energy', amount: 100 }
    const action = {
      type: ADD_TRANSACTION_FULFILLED,
      payload: newTransactions,
    }

    const expectedState = {
      ...initialState,
      data: [...initialState.data, newTransactions],
    }

    const outputState = transactions(initialState, action)
    expect(outputState).toEqual(expectedState)
  })

  it('should return correct state for UPDATE_TRANSACTION_FULFILLED', () => {
    const action = {
      type: UPDATE_TRANSACTION_FULFILLED,
      payload: {
        oldTransactionId: 2,
        newTransaction: { name: 'Z Energy', amount: 150 },
      },
    }

    const expectedState = {
      ...initialState,
      data: mockData,
    }

    const outputState = transactions(initialState, action)
    expect(outputState).toEqual(expectedState)
  })

  it('should return correct state for DELETE_TRANSACTION_FULFILLED', () => {
    const action = {
      type: DELETE_TRANSACTION_FULFILLED,
      payload: 1,
    }

    const expectedState = {
      ...initialState,
      data: [],
    }

    const outputState = transactions(initialState, action)
    expect(outputState).toEqual(expectedState)
  })

  it('should return correct initial state', () => {
    const expectedState = {
      loading: false,
      data: null,
      error: null,
    }

    const outputState = transactions(undefined, {})
    expect(outputState).toEqual(expectedState)
  })
})
