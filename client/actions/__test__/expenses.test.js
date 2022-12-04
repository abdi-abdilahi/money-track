import {
  EXPENSES_PENDING,
  EXPENSES_REJECTED,
  GET_EXPENSES_FULFILLED,
  ADD_EXPENSE_FULFILLED,
  UPDATE_EXPENSE_FULFILLED,
  DELETE_EXPENSE_FULFILLED,
  fetchExpenses,
  postExpenses,
  patchExpense,
  delExpense,
} from '../expenses'

import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from '../../apis/expenses'

jest.mock('../../apis/expenses')
const fakeDispatch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

describe('fetchExpenses', () => {
  const mockData = [{ id: 3, name: 'Groceries', amount: 175 }]

  it('should dispatch the EXPENSES_PENDING action', () => {
    expect.assertions(1)

    getExpenses.mockReturnValue(Promise.resolve(mockData))

    return fetchExpenses()(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: EXPENSES_PENDING,
      })
    })
  })

  it('should dispatch the GET_EXPENSES_FULFILLED action', () => {
    expect.assertions(1)

    getExpenses.mockReturnValue(Promise.resolve(mockData))

    return fetchExpenses()(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: GET_EXPENSES_FULFILLED,
        payload: mockData,
      })
    })
  })

  it('should dispatch the EXPENSES_REJECTED action if api request fails', () => {
    expect.assertions(1)

    getExpenses.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )

    return fetchExpenses()(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: EXPENSES_REJECTED,
        payload: 'Something went wrong',
      })
    })
  })
})

describe('postExpenses', () => {
  const mockData = { name: 'Groceries', amount: 175 }
  const mockDataResponse = { ...mockData, id: 3 }
  it('should dispatch the EXPENSES_PENDING action', () => {
    expect.assertions(1)

    addExpense.mockReturnValue(Promise.resolve(mockDataResponse))

    return postExpenses(
      2,
      mockData
    )(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: EXPENSES_PENDING,
      })
    })
  })

  it('should dispatch the ADD_EXPENSE_FULFILLED action', () => {
    expect.assertions(1)

    addExpense.mockReturnValue(Promise.resolve(mockDataResponse))

    return postExpenses(
      2,
      mockData
    )(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: ADD_EXPENSE_FULFILLED,
        payload: mockDataResponse,
      })
    })
  })

  it('should dispatch the EXPENSES_REJECTED action if api request fails', () => {
    expect.assertions(1)

    addExpense.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )

    return postExpenses(
      2,
      mockData
    )(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: EXPENSES_REJECTED,
        payload: 'Something went wrong',
      })
    })
  })
})

describe('patchExpense', () => {
  const mockData = { name: 'Groceries', amount: 175 }
  const mockDataResponse = { ...mockData, id: 3 }
  it('should dispatch the EXPENSES_PENDING action', () => {
    expect.assertions(1)

    updateExpense.mockReturnValue(Promise.resolve(mockDataResponse))

    return patchExpense(
      3,
      mockData
    )(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: EXPENSES_PENDING,
      })
    })
  })

  it('should dispatch the UPDATE_EXPENSE_FULFILLED action', () => {
    expect.assertions(1)

    updateExpense.mockReturnValue(Promise.resolve(mockDataResponse))

    return patchExpense(
      3,
      mockData
    )(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: UPDATE_EXPENSE_FULFILLED,
        payload: {
          oldExpenseId: 3,
          newExpense: mockDataResponse,
        },
      })
    })
  })

  it('should dispatch the EXPENSES_REJECTED action if api request fails', () => {
    expect.assertions(1)

    updateExpense.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )

    return patchExpense(
      3,
      mockData
    )(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: EXPENSES_REJECTED,
        payload: 'Something went wrong',
      })
    })
  })
})

describe('delExpense', () => {
  it('should dispatch the EXPENSES_PENDING action', () => {
    expect.assertions(1)

    deleteExpense.mockReturnValue(Promise.resolve(200))

    return delExpense(3)(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: EXPENSES_PENDING,
      })
    })
  })

  it('should dispatch the DELETE_EXPENSE_FULFILLED action', () => {
    expect.assertions(1)

    deleteExpense.mockReturnValue(Promise.resolve(200))

    return delExpense(3)(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: DELETE_EXPENSE_FULFILLED,
        payload: 3,
      })
    })
  })

  it('should dispatch the EXPENSES_REJECTED action if api request fails', () => {
    expect.assertions(1)

    deleteExpense.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )

    return delExpense(3)(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: EXPENSES_REJECTED,
        payload: 'Something went wrong',
      })
    })
  })
})
