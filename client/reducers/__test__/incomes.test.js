import incomes from '../incomes'

import {
  INCOMES_PENDING,
  INCOMES_REJECTED,
  GET_INCOMES_FULFILLED,
  ADD_INCOME_FULFILLED,
  UPDATE_INCOME_FULFILLED,
  DELETE_INCOME_FULFILLED,
} from '../../actions/incomes'

describe('incomes reducer', () => {
  const mockData = [
    {
      id: 1,
      name: 'Software Developer',
      amount: 1000,
      startDate: new Date('2022-11-26T23:59:59').toString(),
      endDate: null,
    },
  ]

  const initialState = {
    loading: false,
    error: null,
    data: mockData,
  }

  it('should return correct state for INCOMES_PENDING', () => {
    const action = {
      type: INCOMES_PENDING,
    }

    const expectedState = {
      ...initialState,
      loading: true,
    }

    const outputState = incomes(initialState, action)
    expect(outputState).toEqual(expectedState)
  })

  it('should return correct state for INCOMES_REJECTED', () => {
    const action = {
      type: INCOMES_REJECTED,
      payload: 'mockErrorMessage',
    }

    const expectedState = {
      ...initialState,
      error: 'mockErrorMessage',
    }

    const outputState = incomes(initialState, action)
    expect(outputState).toEqual(expectedState)
  })

  it('should return correct state for GET_INCOMES_FULFILLED', () => {
    const action = {
      type: GET_INCOMES_FULFILLED,
      payload: mockData,
    }

    const expectedState = {
      ...initialState,
      data: mockData,
    }

    const outputState = incomes(initialState, action)
    expect(outputState).toEqual(expectedState)
  })

  it('should return correct state for ADD_INCOME_FULFILLED', () => {
    const newExpense = { id: 4, name: 'DEVA', amount: 900 }
    const action = {
      type: ADD_INCOME_FULFILLED,
      payload: newExpense,
    }

    const expectedState = {
      ...initialState,
      data: [...initialState.data, newExpense],
    }

    const outputState = incomes(initialState, action)
    expect(outputState).toEqual(expectedState)
  })

  it('should return correct state for UPDATE_INCOME_FULFILLED', () => {
    const action = {
      type: UPDATE_INCOME_FULFILLED,
      payload: {
        oldExpenseId: 4,
        newExpense: { name: 'DEVA', amount: 1200 },
      },
    }

    const expectedState = {
      ...initialState,
      data: mockData,
    }

    const outputState = incomes(initialState, action)
    expect(outputState).toEqual(expectedState)
  })

  it('should return correct state for DELETE_INCOME_FULFILLED', () => {
    const action = {
      type: DELETE_INCOME_FULFILLED,
      payload: 1,
    }

    const expectedState = {
      ...initialState,
      data: [],
    }

    const outputState = incomes(initialState, action)
    expect(outputState).toEqual(expectedState)
  })

  it('should return correct initial state', () => {
    const expectedState = {
      loading: false,
      data: null,
      error: null,
    }

    const outputState = incomes(undefined, {})

    expect(outputState).toEqual(expectedState)
  })
})
