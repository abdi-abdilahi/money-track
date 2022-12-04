import expenses from '../expenses'

import {
  EXPENSES_PENDING,
  EXPENSES_REJECTED,
  GET_EXPENSES_FULFILLED,
  ADD_EXPENSE_FULFILLED,
  UPDATE_EXPENSE_FULFILLED,
  DELETE_EXPENSE_FULFILLED,
} from '../../actions/expenses'

describe('expenses reducer', () => {
  const mockData = [{ id: 3, name: 'Groceries', amount: 175 }]

  const initialState = {
    loading: false,
    error: undefined,
    data: mockData,
  }

  it('should return correct state for EXPENSES_PENDING', () => {
    const action = {
      type: EXPENSES_PENDING,
    }

    const expectedState = {
      ...initialState,
      loading: true,
    }

    const outputState = expenses(initialState, action)
    expect(outputState).toEqual(expectedState)
  })

  it('should return correct state for EXPENSES_REJECTED', () => {
    const action = {
      type: EXPENSES_REJECTED,
      payload: 'mockErrorMessage',
    }

    const expectedState = {
      ...initialState,
      error: 'mockErrorMessage',
    }

    const outputState = expenses(initialState, action)
    expect(outputState).toEqual(expectedState)
  })

  it('should return correct state for GET_EXPENSES_FULFILLED', () => {
    const action = {
      type: GET_EXPENSES_FULFILLED,
      payload: mockData,
    }

    const expectedState = {
      ...initialState,
      data: mockData,
    }

    const outputState = expenses(initialState, action)
    expect(outputState).toEqual(expectedState)
  })

  it('should return correct state for ADD_EXPENSE_FULFILLED', () => {
    const newExpense = { id: 4, name: 'Health Insurance', amount: 50 }
    const action = {
      type: ADD_EXPENSE_FULFILLED,
      payload: newExpense,
    }

    const expectedState = {
      ...initialState,
      data: [...initialState.data, newExpense],
    }

    const outputState = expenses(initialState, action)
    expect(outputState).toEqual(expectedState)
  })

  it('should return correct state for UPDATE_EXPENSE_FULFILLED', () => {
    const action = {
      type: UPDATE_EXPENSE_FULFILLED,
      payload: {
        oldExpenseId: 3,
        newExpense: { name: 'Groceries', amount: 200 },
      },
    }

    const expectedState = {
      ...initialState,
      data: [{ name: 'Groceries', amount: 200 }],
    }

    const outputState = expenses(initialState, action)
    expect(outputState).toEqual(expectedState)
  })

  it('should return correct state for DELETE_EXPENSE_FULFILLED', () => {
    const action = {
      type: DELETE_EXPENSE_FULFILLED,
      payload: 3,
    }

    const expectedState = {
      ...initialState,
      data: [],
    }

    const outputState = expenses(initialState, action)
    expect(outputState).toEqual(expectedState)
  })
})
