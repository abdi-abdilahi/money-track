const knex = require('knex')
const config = require('../knexfile').test
const testDb = knex(config)

const db = require('../expenses')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

describe('getExpenses', () => {
  it('should return the correct expenses array.', () => {
    expect.assertions(2)

    const expected = {
      id: 1,
      name: 'Petrol',
      amount: 50,
    }

    return db.getExpenses(1, testDb).then((expenses) => {
      expect(expenses).toHaveLength(8)
      expect(expenses[0]).toEqual(expected)
    })
  })
})

describe('addExpense', () => {
  it('should return the newly added expense.', () => {
    expect.assertions(1)

    const newExpense = {
      name: 'Petrol',
      amount: 50,
      budget_id: 1,
    }

    const expected = {
      id: 9,
      name: 'Petrol',
      amount: 50,
    }

    return db.addExpense(newExpense, testDb).then(([expense]) => {
      expect(expense).toEqual(expected)
    })
  })
})

describe('updateExpense', () => {
  it('should return the newly updated expense.', () => {
    expect.assertions(1)

    const updatedExpense = {
      name: 'Petrol',
      amount: 100,
    }

    const expected = {
      id: 1,
      name: 'Petrol',
      amount: 100,
    }

    return db.updateExpense(1, updatedExpense, testDb).then(([expense]) => {
      expect(expense).toEqual(expected)
    })
  })
})

describe('deleteExpense', () => {
  it('should delete the expense with the given income id.', () => {
    expect.assertions(1)

    return db.deleteExpense(8, testDb).then((numRecordsDeleted) => {
      expect(numRecordsDeleted).toBe(1)
    })
  })
})
