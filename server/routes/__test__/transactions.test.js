const request = require('supertest')
const server = require('../../server')

const {
  getTransactions,
  getTransactionById,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../../db/transactions')

jest.mock('../../db/transactions')
jest.spyOn(console, 'error').mockImplementation(() => {})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('GET /api/v1/transactions', () => {
  const mockDataResponse = [
    {
      id: 1,
      name: 'PakNSave',
      amount: 110,
      dateCreated: '2022-11-25',
      expensesId: 3,
      expensesName: 'Groceries',
    },
  ]

  it('should return the transactions list.', () => {
    expect.assertions(2)

    getTransactions.mockReturnValue(Promise.resolve(mockDataResponse))

    return request(server)
      .get('/api/v1/transactions')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(1)
      })
  })

  it('should return status 500 and an error message when a failure occurs.', () => {
    expect.assertions(2)

    getTransactions.mockImplementation(() =>
      Promise.reject('Something went wrong')
    )

    return request(server)
      .get('/api/v1/transactions')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Something went wrong')
      })
  })
})

describe('POST /api/v1/transactions', () => {
  const mockData = {
    name: 'PakNSave',
    amount: 50,
    date_created: '2022-11-25',
    expenses_id: 3,
  }
  const mockDataResponse = {
    id: 1,
    name: 'PakNSave',
    amount: 50,
    dateCreated: '2022-11-25',
    expensesId: 3,
    expensesName: 'Groceries',
  }

  it('should return the newly added transaction.', () => {
    expect.assertions(2)

    addTransaction.mockReturnValue(Promise.resolve([{ id: 1 }]))
    getTransactionById.mockReturnValue(Promise.resolve(mockDataResponse))

    return request(server)
      .post('/api/v1/transactions')
      .send(mockData)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toEqual(mockDataResponse)
      })
  })

  it('should return status 500 and an error message when a failure occurs.', () => {
    expect.assertions(2)

    addTransaction.mockImplementation(() =>
      Promise.reject('Something went wrong')
    )

    return request(server)
      .post('/api/v1/transactions')
      .send(mockData)
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Something went wrong')
      })
  })
})

describe('PATCH /api/v1/transactions/:transactionId', () => {
  const mockData = {
    name: 'PakNSave',
    amount: 500,
    date_created: '2022-11-25',
    expenses_id: 3,
  }
  const mockDataResponse = {
    id: 1,
    name: 'PakNSave',
    amount: 500,
    dateCreated: '2022-11-25',
    expensesId: 3,
    expensesName: 'Groceries',
  }

  it('should return the newly updated transaction.', () => {
    expect.assertions(2)

    updateTransaction.mockReturnValue(Promise.resolve([1]))
    getTransactionById.mockReturnValue(Promise.resolve(mockDataResponse))

    return request(server)
      .patch('/api/v1/transactions/1')
      .send(mockData)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toEqual(mockDataResponse)
      })
  })

  it('should return status 500 and an error message when a failure occurs.', () => {
    expect.assertions(2)

    updateTransaction.mockImplementation(() =>
      Promise.reject('Something went wrong')
    )

    return request(server)
      .patch('/api/v1/transactions/1')
      .send(mockData)
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Something went wrong')
      })
  })
})

describe('DELETE /api/v1/transactions/:transactionId', () => {
  it('should return status 200.', () => {
    expect.assertions(1)

    deleteTransaction.mockReturnValue(Promise.resolve([1]))

    return request(server)
      .delete('/api/v1/transactions/1')
      .then((res) => {
        expect(res.status).toBe(200)
      })
  })

  it('should return status 500 and an error message when a failure occurs.', () => {
    expect.assertions(2)

    deleteTransaction.mockImplementation(() =>
      Promise.reject('Something went wrong')
    )

    return request(server)
      .delete('/api/v1/transactions/1')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Something went wrong')
      })
  })
})
