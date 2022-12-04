import nock from 'nock'
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from '../transactions'

const rootUrl = '/api/v1/transactions/'

describe('getTransactions', () => {
  it('should return the transactions list.', () => {
    const mockDataResponse = [
      {
        id: 1,
        name: 'PakNSave',
        amount: 1000,
      },
    ]

    const scope = nock('http://localhost')
      .get(rootUrl)
      .reply(200, mockDataResponse)

    return getTransactions().then((res) => {
      expect(res).toHaveLength(1)
      expect(res).toEqual(mockDataResponse)
      expect(scope.isDone()).toBe(true)
    })
  })

  it('should return an error.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost').get(rootUrl).reply(500)

    return getTransactions().then((res) => {
      expect(res.message).toBe('Internal Server Error')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('addTransaction', () => {
  const mockData = {
    name: 'PakNSave',
    amount: 1000,
  }

  const mockDataResponse = {
    ...mockData,
    id: 4,
  }

  it('should return the newly added transaction.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost')
      .post(rootUrl)
      .reply(200, mockDataResponse)

    return addTransaction(mockData).then((res) => {
      expect(res).toEqual(mockDataResponse)
      expect(scope.isDone()).toBe(true)
    })
  })

  it('should return an error.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost').post(rootUrl).reply(500)

    return addTransaction(mockData).then((res) => {
      expect(res.message).toBe('Internal Server Error')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('updateTransaction', () => {
  const mockData = {
    name: 'PakNSave',
    amount: 1000,
  }

  const mockDataResponse = {
    ...mockData,
    id: 4,
  }

  it('should return the newly updated  transaction.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost')
      .patch(rootUrl + '4')
      .reply(200, mockDataResponse)

    return updateTransaction(4, mockData).then((res) => {
      expect(res).toEqual(mockDataResponse)
      expect(scope.isDone()).toBe(true)
    })
  })

  it('should return an error.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost')
      .patch(rootUrl + '4')
      .reply(500)

    return updateTransaction(4, mockData).then((res) => {
      expect(res.message).toBe('Internal Server Error')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('deleteTransaction', () => {
  it('should return status 200.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost')
      .delete(rootUrl + '4')
      .reply(200)

    return deleteTransaction(4).then((res) => {
      expect(res).toBe(200)
      expect(scope.isDone()).toBe(true)
    })
  })

  it('should return an error.', () => {
    expect.assertions(2)

    const scope = nock('http://localhost')
      .delete(rootUrl + '4')
      .reply(500)

    return deleteTransaction(4).then((res) => {
      expect(res.message).toBe('Internal Server Error')
      expect(scope.isDone()).toBe(true)
    })
  })
})
