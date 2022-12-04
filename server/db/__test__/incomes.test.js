const knex = require('knex')
const config = require('../knexfile').test
const testDb = knex(config)

const db = require('../incomes')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

describe('getIncomesByBudgetId', () => {
  it('should return the correct income array.', () => {
    expect.assertions(2)

    const expected = {
      id: 1,
      name: 'Software Developer',
      amount: 1000,
      startDate: new Date('2022-11-26T23:59:59').toString(),
      endDate: null,
    }

    return db.getIncomesByBudgetId(1, testDb).then((incomes) => {
      expect(incomes).toHaveLength(3)
      expect(incomes[0]).toEqual(expected)
    })
  })
})

describe('addIncomes', () => {
  it('should return the newly added income.', () => {
    expect.assertions(1)

    const mockData = {
      name: 'DEVA',
      amount: 1000,
      start_date: new Date('2022-12-02T23:59:59').toString(),
      end_date: null,
      budget_id: 1,
    }

    const mockDataResponse = {
      id: 4,
      name: 'DEVA',
      amount: 1000,
      startDate: new Date('2022-12-02T23:59:59').toString(),
      endDate: null,
    }

    return db.addIncomes(mockData, testDb).then(([income]) => {
      expect(income).toEqual(mockDataResponse)
    })
  })
})

describe('updateIncome', () => {
  it('should return the newly updated income.', () => {
    expect.assertions(1)

    const mockData = {
      name: 'DEVA',
      amount: 1000,
    }

    const mockDataResponse = {
      id: 3,
      name: 'DEVA',
      amount: 1000,
      startDate: new Date('2022-11-26T23:59:59').toString(),
      endDate: null,
    }

    return db.updateIncome(3, mockData, testDb).then(([income]) => {
      expect(income).toEqual(mockDataResponse)
    })
  })
})

describe('deleteIncome', () => {
  it('should delete the income with the given income id.', () => {
    expect.assertions(1)

    return db.deleteIncome(3, testDb).then((numRecordsDeleted) => {
      expect(numRecordsDeleted).toBe(1)
    })
  })
})
