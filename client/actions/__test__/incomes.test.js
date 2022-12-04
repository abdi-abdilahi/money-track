import {
  INCOMES_PENDING,
  INCOMES_REJECTED,
  GET_INCOMES_FULFILLED,
  ADD_INCOME_FULFILLED,
  UPDATE_INCOME_FULFILLED,
  DELETE_INCOME_FULFILLED,
  fetchIncomes,
  postIncomes,
  patchIncomes,
  delIncomes,
} from '../incomes'

import {
  getIncomes,
  addIncome,
  updateIncome,
  deleteIncome,
} from '../../apis/incomes'

jest.mock('../../apis/incomes')
const fakeDispatch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

describe('fetchIncomes', () => {
  const mockData = [
    {
      name: 'Software Developer',
      amount: 1000,
    },
  ]

  it('should dispatch the INCOMES_PENDING action', () => {
    expect.assertions(1)

    getIncomes.mockReturnValue(Promise.resolve(mockData))

    return fetchIncomes()(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: INCOMES_PENDING,
      })
    })
  })

  it('should dispatch the GET_INCOMES_FULFILLED action', () => {
    expect.assertions(1)

    getIncomes.mockReturnValue(Promise.resolve(mockData))

    return fetchIncomes()(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: GET_INCOMES_FULFILLED,
        payload: mockData,
      })
    })
  })

  it('should dispatch the INCOMES_REJECTED action if api request fails', () => {
    expect.assertions(1)

    getIncomes.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )

    return fetchIncomes()(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: INCOMES_REJECTED,
        payload: 'Something went wrong',
      })
    })
  })
})

describe('postIncomes', () => {
  const mockData = [
    {
      name: 'Software Developer',
      amount: 1000,
    },
  ]
  const mockDataResponse = { ...mockData, id: 3 }

  it('should dispatch the INCOMES_PENDING action', () => {
    expect.assertions(1)

    addIncome.mockReturnValue(Promise.resolve(mockDataResponse))

    return postIncomes(
      2,
      mockData
    )(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: INCOMES_PENDING,
      })
    })
  })

  it('should dispatch the ADD_INCOME_FULFILLED action', () => {
    expect.assertions(1)

    addIncome.mockReturnValue(Promise.resolve(mockDataResponse))

    return postIncomes(
      2,
      mockData
    )(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: ADD_INCOME_FULFILLED,
        payload: mockDataResponse,
      })
    })
  })

  it('should dispatch the INCOMES_REJECTED action if api request fails', () => {
    expect.assertions(1)

    addIncome.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )

    return postIncomes(
      2,
      mockData
    )(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: INCOMES_REJECTED,
        payload: 'Something went wrong',
      })
    })
  })
})

describe('patchIncomes', () => {
  const mockData = [
    {
      name: 'Software Developer',
      amount: 1000,
    },
  ]
  const mockDataResponse = { ...mockData, id: 3 }

  it('should dispatch the INCOMES_PENDING action', () => {
    expect.assertions(1)

    updateIncome.mockReturnValue(Promise.resolve(mockDataResponse))

    return patchIncomes(
      3,
      mockData
    )(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: INCOMES_PENDING,
      })
    })
  })

  it('should dispatch the UPDATE_INCOME_FULFILLED action', () => {
    expect.assertions(1)

    updateIncome.mockReturnValue(Promise.resolve(mockDataResponse))

    return patchIncomes(
      3,
      mockData
    )(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: UPDATE_INCOME_FULFILLED,
        payload: {
          oldIncomeId: 3,
          newIncome: mockDataResponse,
        },
      })
    })
  })

  it('should dispatch the INCOMES_REJECTED action if api request fails', () => {
    expect.assertions(1)

    updateIncome.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )

    return patchIncomes(
      3,
      mockData
    )(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: INCOMES_REJECTED,
        payload: 'Something went wrong',
      })
    })
  })
})

describe('delIncomes', () => {
  it('should dispatch the INCOMES_PENDING action', () => {
    expect.assertions(1)

    deleteIncome.mockReturnValue(Promise.resolve(200))

    return delIncomes(3)(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: INCOMES_PENDING,
      })
    })
  })

  it('should dispatch the DELETE_INCOME_FULFILLED action', () => {
    expect.assertions(1)

    deleteIncome.mockReturnValue(Promise.resolve(200))

    return delIncomes(3)(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: DELETE_INCOME_FULFILLED,
        payload: 3,
      })
    })
  })

  it('should dispatch the INCOMES_REJECTED action if api request fails', () => {
    expect.assertions(1)

    deleteIncome.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )

    return delIncomes(3)(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: INCOMES_REJECTED,
        payload: 'Something went wrong',
      })
    })
  })
})
