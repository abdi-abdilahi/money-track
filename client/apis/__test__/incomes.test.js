import nock from 'nock'
import { getIncomes, addIncome, updateIncome, deleteIncome } from '../incomes'

const rootUrl = '/api/v1/incomes/'

describe('getIncomes', () => {
  it('should return the incomes list by budget ID.', () => {
    expect.assertions(3)

    const mockDataResponse = [
      {
        id: 1,
        name: 'Software Developer',
        amount: 1000,
        startDate: new Date('2022-11-26T23:59:59').toString(),
        endDate: null,
      },
    ]

    const scope = nock('http://localhost')
      .get(rootUrl + '1')
      .reply(200, mockDataResponse)

    return getIncomes(1).then((res) => {
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

    return getIncomes(1).then((res) => {
      expect(res.message).toBe('Internal Server Error')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('addIncome', () => {
  const mockData = {
    name: 'Software Developer',
    amount: 1000,
    budget_id: 1,
    start_date: new Date(Date.now).toString(),
    end_date: null,
  }
  const mockDataResponse = {
    ...mockData,
    id: 4,
  }

  it('should return the newly added income.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost')
      .post(rootUrl + '1')
      .reply(200, mockDataResponse)

    return addIncome(1, mockData).then((res) => {
      expect(res).toEqual(mockDataResponse)
      expect(scope.isDone()).toBe(true)
    })
  })

  it('should return an error.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost')
      .post(rootUrl + '1')
      .reply(500)

    return addIncome(1, mockData).then((res) => {
      expect(res.message).toBe('Internal Server Error')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('updateIncome', () => {
  const mockData = {
    name: 'Software Developer',
    amount: 1000,
  }

  const mockDataResponse = {
    ...mockData,
    id: 4,
    startDate: new Date(Date.now).toString(),
    endDate: null,
  }

  it('should return the newly updated income.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost')
      .patch(rootUrl + '4')
      .reply(200, mockDataResponse)

    return updateIncome(4, mockData).then((res) => {
      expect(res).toEqual(mockDataResponse)
      expect(scope.isDone()).toBe(true)
    })
  })

  it('should return an error.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost')
      .patch(rootUrl + '4')
      .reply(500)

    return updateIncome(4, mockData).then((res) => {
      expect(res.message).toBe('Internal Server Error')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('deleteIncome', () => {
  it('should return status 200.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost')
      .delete(rootUrl + '4')
      .reply(200)

    return deleteIncome(4).then((res) => {
      expect(res).toBe(200)
      expect(scope.isDone()).toBe(true)
    })
  })

  it('should return an error.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost')
      .delete(rootUrl + '4')
      .reply(500)

    return deleteIncome(4).then((res) => {
      expect(res.message).toBe('Internal Server Error')
      expect(scope.isDone()).toBe(true)
    })
  })
})
