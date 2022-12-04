const request = require('supertest')
const server = require('../../server')

jest.mock('../../db/expenses')
jest.spyOn(console, 'error').mockImplementation(() => {})

afterAll(() => {
  jest.restoreAllMocks()
})

const {
  getExpensesByBudgetId,
  addExpense,
  updateExpense,
  deleteExpense,
} = require('../../db/expenses')

describe('GET /api/v1/expenses/:budgetId', () => {
  it('should return the expenses list by budget ID.', () => {
    expect.assertions(2)

    const mockDataResponse = [
      { id: 1, name: 'Petrol', amount: 50, budget_id: 1 },
    ]

    getExpensesByBudgetId.mockReturnValue(Promise.resolve(mockDataResponse))

    return request(server)
      .get('/api/v1/expenses/1')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(1)
      })
  })

  it('should return status 500 and an error message when a failure occurs', () => {
    expect.assertions(2)

    getExpensesByBudgetId.mockImplementation(() =>
      Promise.reject('Something went wrong')
    )

    return request(server)
      .get('/api/v1/expenses/1')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Something went wrong')
      })
  })
})

describe('POST /api/v1/expenses/:budgetId', () => {
  const mockData = { name: 'Computer', amount: 2500, budget_id: 1 }

  const mockDataResponse = { id: 9, name: 'Computer', amount: 2500 }

  it('should return the newly added expense.', () => {
    expect.assertions(2)

    addExpense.mockReturnValue(Promise.resolve([mockDataResponse]))

    return request(server)
      .post('/api/v1/expenses/1')
      .send(mockData)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toEqual(mockDataResponse)
      })
  })

  it('should return status 500 and an error message when a failure occurs', () => {
    expect.assertions(2)

    addExpense.mockImplementation(() => Promise.reject('Something went wrong'))

    return request(server)
      .post('/api/v1/expenses/1')
      .send(mockData)
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Something went wrong')
      })
  })
})

describe('PATCH /api/v1/expenses/:expenseId', () => {
  const mockData = { name: 'Petrol', amount: 100 }

  const mockDataResponse = { id: 1, name: 'Petrol', amount: 100 }

  it('should return the newly updated expense.', () => {
    expect.assertions(2)

    updateExpense.mockReturnValue(Promise.resolve([mockDataResponse]))

    return request(server)
      .patch('/api/v1/expenses/1')
      .send(mockData)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toEqual(mockDataResponse)
      })
  })

  it('should return status 500 and an error message when a failure occurs', () => {
    expect.assertions(2)

    updateExpense.mockImplementation(() =>
      Promise.reject('Something went wrong')
    )

    return request(server)
      .patch('/api/v1/expenses/1')
      .send(mockData)
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Something went wrong')
      })
  })
})

describe('DELETE /api/v1/expenses/:expenseId', () => {
  it('should return status 200.', () => {
    expect.assertions(1)

    deleteExpense.mockReturnValue(Promise.resolve([1]))

    return request(server)
      .delete('/api/v1/expenses/1')
      .then((res) => {
        expect(res.status).toBe(200)
      })
  })

  it('should return status 500 and an error message when a failure occurs', () => {
    expect.assertions(2)

    deleteExpense.mockImplementation(() =>
      Promise.reject('Something went wrong')
    )

    return request(server)
      .delete('/api/v1/expenses/1')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Something went wrong')
      })
  })
})
