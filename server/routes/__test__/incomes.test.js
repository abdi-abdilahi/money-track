const request = require('supertest')
const server = require('../../server')

const {
  getIncomesByBudgetId,
  addIncomes,
  updateIncome,
  deleteIncome,
} = require('../../db/incomes')

jest.mock('../../db/incomes')
jest.spyOn(console, 'error').mockImplementation(() => {})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('GET /api/v1/incomes/:budgetId', () => {
  const mockDataResponse = [
    {
      id: 1,
      name: 'Software Developer',
      amount: 1000,
      start_date: new Date('2022-11-26T23:59:59'),
      end_date: null,
      budget_id: 1,
    },
  ]

  it('should return the income list by budget ID.', () => {
    expect.assertions(2)

    getIncomesByBudgetId.mockReturnValue(Promise.resolve(mockDataResponse))

    return request(server)
      .get('/api/v1/incomes/1')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(1)
      })
  })

  it('should return status 500 and an error message when a failure occurs', () => {
    expect.assertions(2)

    getIncomesByBudgetId.mockImplementation(() =>
      Promise.reject('Something went wrong')
    )

    return request(server)
      .get('/api/v1/incomes/1')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Something went wrong')
      })
  })
})

describe('POST /api/v1/incomes/:budgetId', () => {
  const mockData = {
    name: 'Software Developer',
    amount: 1000,
    start_date: new Date('2022-11-26T23:59:59').toString(),
    end_date: null,
    budget_id: 1,
  }

  const mockDataResponse = {
    ...mockData,
    id: 4,
  }

  it('should return the newly added income.', () => {
    expect.assertions(2)

    addIncomes.mockReturnValue(Promise.resolve([mockDataResponse]))

    return request(server)
      .post('/api/v1/incomes/1')
      .send(mockData)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toEqual(mockDataResponse)
      })
  })

  it('should return status 500 and an error message when a failure occurs', () => {
    expect.assertions(2)

    addIncomes.mockImplementation(() => Promise.reject('Something went wrong'))

    return request(server)
      .post('/api/v1/incomes/1')
      .send(mockData)
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Something went wrong')
      })
  })
})

describe('PATCH /api/v1/incomes/:incomeId', () => {
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

  it('should return the newly updated income.', () => {
    expect.assertions(2)

    updateIncome.mockReturnValue(Promise.resolve([mockDataResponse]))

    return request(server)
      .patch('/api/v1/incomes/1')
      .send(mockData)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toEqual(mockDataResponse)
      })
  })

  it('should return status 500 and an error message when a failure occurs', () => {
    expect.assertions(2)

    updateIncome.mockImplementation(() =>
      Promise.reject('Something went wrong')
    )

    return request(server)
      .patch('/api/v1/incomes/1')
      .send(mockData)
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Something went wrong')
      })
  })
})

describe('DELETE /api/v1/incomes/:incomeId', () => {
  it('should return status 200.', () => {
    expect.assertions(1)

    deleteIncome.mockReturnValue(Promise.resolve([1]))

    return request(server)
      .delete('/api/v1/incomes/1')
      .then((res) => {
        expect(res.status).toBe(200)
      })
  })

  it('should return status 500 and an error message when a failure occurs', () => {
    expect.assertions(2)

    deleteIncome.mockImplementation(() =>
      Promise.reject('Something went wrong')
    )

    return request(server)
      .delete('/api/v1/incomes/1')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Something went wrong')
      })
  })
})
