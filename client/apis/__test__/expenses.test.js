import nock from 'nock'
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from '../expenses'

const rootUrl = '/api/v1/expenses/'

describe('getExpenses', () => {
  it('should return the expenses list by budget ID.', () => {
    expect.assertions(3)

    const mockDataResponse = [
      { id: 1, name: 'Petrol', amount: 50, budget_id: 1 },
    ]

    const scope = nock('http://localhost')
      .get(rootUrl + '1')
      .reply(200, mockDataResponse)

    return getExpenses(1).then((res) => {
      expect(res).toHaveLength(1)
      expect(res).toEqual(mockDataResponse)
      expect(scope.isDone()).toBe(true)
    })
  })

  it('should return an error.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost')
      .get(rootUrl + '1')
      .reply(500)

    return getExpenses(1).then((res) => {
      expect(res.message).toBe('Internal Server Error')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('addExpense', () => {
  const mockData = { name: 'Computer', amount: 2500, budget_id: 1 }
  const mockDataResponse = {
    ...mockData,
    id: 4,
  }
  it('should return the newly added expense.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost')
      .post(rootUrl + '1')
      .reply(200, mockDataResponse)

    return addExpense(1, mockData).then((res) => {
      expect(res).toEqual(mockDataResponse)
      expect(scope.isDone()).toBe(true)
    })
  })

  it('should return an error.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost')
      .post(rootUrl + '1')
      .reply(500)

    return addExpense(1, mockData).then((res) => {
      expect(res.message).toBe('Internal Server Error')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('updateExpense', () => {
  const mockData = {
    name: 'Software Developer',
    amount: 1200,
  }

  const mockDataResponse = {
    ...mockData,
    id: 4,
    startDate: new Date('2022-11-26T23:59:59').toString(),
    endDate: null,
    budgetId: 1,
  }

  it('should return the newly updated expense.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost')
      .patch(rootUrl + '4')
      .reply(200, mockDataResponse)

    return updateExpense(4, mockData).then((res) => {
      expect(res).toEqual(mockDataResponse)
      expect(scope.isDone()).toBe(true)
    })
  })

  it('should return an error.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost')
      .patch(rootUrl + '4')
      .reply(500)

    return updateExpense(4, mockData).then((res) => {
      expect(res.message).toBe('Internal Server Error')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('deleteExpense', () => {
  it('should return status 200.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost')
      .delete(rootUrl + '4')
      .reply(200)

    return deleteExpense(4).then((res) => {
      expect(res).toBe(200)
      expect(scope.isDone()).toBe(true)
    })
  })

  it('should return an error.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost')
      .delete(rootUrl + '4')
      .reply(500)

    return deleteExpense(4).then((res) => {
      expect(res.message).toBe('Internal Server Error')
      expect(scope.isDone()).toBe(true)
    })
  })
})
