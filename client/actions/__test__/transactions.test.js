import {
  TRANSACTIONS_PENDING,
  TRANSACTIONS_REJECTED,
  GET_TRANSACTIONS_FULFILLED,
  ADD_TRANSACTION_FULFILLED,
  UPDATE_TRANSACTION_FULFILLED,
  DELETE_TRANSACTION_FULFILLED,
  fetchTransactions,
  postTransaction,
  patchTransaction,
  delTransaction,
} from '../transactions'

import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from '../../apis/transactions'

jest.mock('../../apis/transactions')
const fakeDispatch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

describe('fetchTransactions', () => {
  const mockData = [
    {
      name: 'PakNSave',
      amount: 110,
    },
  ]

  it('should dispatch the TRANSACTIONS_PENDING action', () => {
    expect.assertions(1)

    getTransactions.mockReturnValue(Promise.resolve(mockData))

    return fetchTransactions()(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: TRANSACTIONS_PENDING,
      })
    })
  })

  it('should dispatch the GET_TRANSACTIONS_FULFILLED action', () => {
    expect.assertions(1)

    getTransactions.mockReturnValue(Promise.resolve(mockData))

    return fetchTransactions()(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: GET_TRANSACTIONS_FULFILLED,
        payload: mockData,
      })
    })
  })

  it('should dispatch the TRANSACTIONS_REJECTED action', () => {
    expect.assertions(1)

    getTransactions.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )

    return fetchTransactions()(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: TRANSACTIONS_REJECTED,
        payload: 'Something went wrong',
      })
    })
  })
})

describe('postTransaction', () => {
  const mockData = [
    {
      name: 'PakNSave',
      amount: 110,
    },
  ]

  const mockDataResponse = { ...mockData, id: 3 }

  it('should dispatch the TRANSACTIONS_PENDING action', () => {
    expect.assertions(1)

    addTransaction.mockReturnValue(Promise.resolve(mockDataResponse))

    return postTransaction(mockData)(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: TRANSACTIONS_PENDING,
      })
    })
  })

  it('should dispatch the ADD_TRANSACTION_FULFILLED action', () => {
    expect.assertions(1)

    addTransaction.mockReturnValue(Promise.resolve(mockDataResponse))

    return postTransaction(mockData)(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: ADD_TRANSACTION_FULFILLED,
        payload: mockDataResponse,
      })
    })
  })

  it('should dispatch the TRANSACTIONS_REJECTED action', () => {
    expect.assertions(1)

    addTransaction.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )

    return postTransaction(mockData)(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: TRANSACTIONS_REJECTED,
        payload: 'Something went wrong',
      })
    })
  })
})

describe('patchTransaction', () => {
  const mockData = [
    {
      name: 'PakNSave',
      amount: 200,
    },
  ]

  const mockDataResponse = { ...mockData, id: 3 }

  it('should dispatch the TRANSACTIONS_PENDING action', () => {
    expect.assertions(1)

    updateTransaction.mockReturnValue(Promise.resolve(mockDataResponse))

    return patchTransaction(
      3,
      mockData
    )(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: TRANSACTIONS_PENDING,
      })
    })
  })

  it('should dispatch the UPDATE_TRANSACTION_FULFILLED action', () => {
    expect.assertions(1)

    updateTransaction.mockReturnValue(Promise.resolve(mockDataResponse))

    return patchTransaction(
      3,
      mockData
    )(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: UPDATE_TRANSACTION_FULFILLED,
        payload: { oldTransactionId: 3, newTransaction: mockDataResponse },
      })
    })
  })

  it('should dispatch the TRANSACTIONS_REJECTED action', () => {
    expect.assertions(1)

    updateTransaction.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )

    return patchTransaction(
      3,
      mockData
    )(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: TRANSACTIONS_REJECTED,
        payload: 'Something went wrong',
      })
    })
  })
})

describe('delTransaction', () => {
  it('should dispatch the TRANSACTIONS_PENDING action', () => {
    expect.assertions(1)

    deleteTransaction.mockReturnValue(Promise.resolve(200))

    return delTransaction(3)(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: TRANSACTIONS_PENDING,
      })
    })
  })

  it('should dispatch the DELETE_TRANSACTION_FULFILLED action', () => {
    expect.assertions(1)

    deleteTransaction.mockReturnValue(Promise.resolve(200))

    return delTransaction(3)(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: DELETE_TRANSACTION_FULFILLED,
        payload: 3,
      })
    })
  })

  it('should dispatch the TRANSACTIONS_REJECTED action', () => {
    expect.assertions(1)

    deleteTransaction.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )

    return delTransaction(3)(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: TRANSACTIONS_REJECTED,
        payload: 'Something went wrong',
      })
    })
  })
})
