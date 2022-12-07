const knex = require('knex')
const config = require('../knexfile').test
const testDb = knex(config)

const db = require('../transactions')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

describe('getTransactions', () => {
  it('should return the correct transactions array.', () => {
    expect.assertions(2)

    const expected = {
      id: 1,
      name: 'PakNSave',
      amount: 110,
      dateCreated: '2022-11-12',
      expensesId: 3,
      expensesName: 'Groceries',
    }

    return db.getTransactions(testDb).then((incomes) => {
      expect(incomes).toHaveLength(4)
      expect(incomes[0]).toEqual(expected)
    })
  })
})

describe('getTransactionById', () => {
  it('should return the correct transaction.', () => {
    expect.assertions(1)

    const expected = {
      id: 1,
      name: 'PakNSave',
      amount: 110,
      dateCreated: '2022-11-12',
      expensesId: 3,
      expensesName: 'Groceries',
    }

    return db.getTransactionById(1, testDb).then((incomes) => {
      expect(incomes).toEqual(expected)
    })
  })
})

describe('addTransaction', () => {
  it('should add the new transaction and return the id created.', () => {
    expect.assertions(1)

    const mockData = {
      name: 'Countdown',
      amount: 110,
      date_created: '2022-11-25',
      expenses_id: 3,
    }

    return db.addTransaction(mockData, testDb).then(([{ id }]) => {
      expect(id).toBe(5)
    })
  })
})

describe('updateTransaction', () => {
  it('should update the transaction with the given id', () => {
    expect.assertions(1)
    const mockData = {
      name: 'Countdown',
      amount: 200,
      date_created: '2022-11-25',
      expenses_id: 3,
    }

    return db.updateTransaction(4, mockData, testDb).then((res) => {
      expect(res).toBe(1)
    })
  })
})

describe('deleteTransaction', () => {
  it('should delete the transaction with the given transaction id.', () => {
    expect.assertions(1)

    return db.deleteTransaction(4, testDb).then((numRecordsDeleted) => {
      expect(numRecordsDeleted).toBe(1)
    })
  })
})
