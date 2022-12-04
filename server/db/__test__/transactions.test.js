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
      dateCreated: new Date('2022-11-25T23:59:59').toString(),
      expensesId: 3,
    }

    return db.getTransactions(testDb).then((incomes) => {
      expect(incomes).toHaveLength(4)
      expect(incomes[0]).toEqual(expected)
    })
  })
})

describe('addTransaction', () => {
  it('should return the newly added transaction.', () => {
    expect.assertions(1)

    const mockData = {
      name: 'Countdown',
      amount: 110,
      date_created: new Date('2022-11-25T23:59:59').toString(),
      expenses_id: 3,
    }

    const mockDataResponse = {
      id: 5,
      name: 'Countdown',
      amount: 110,
      dateCreated: new Date('2022-11-25T23:59:59').toString(),
      expensesId: 3,
    }

    return db.addTransaction(mockData, testDb).then(([income]) => {
      expect(income).toEqual(mockDataResponse)
    })
  })
})

describe('updateTransaction', () => {
  it('should return the newly updated transaction.', () => {
    expect.assertions(1)
    const mockData = {
      name: 'Countdown',
      amount: 200,
      date_created: new Date('2022-11-25T23:59:59').toString(),
      expenses_id: 3,
    }

    const mockDataResponse = {
      id: 4,
      name: 'Countdown',
      amount: 200,
      dateCreated: new Date('2022-11-25T23:59:59').toString(),
      expensesId: 3,
    }

    return db.updateTransaction(4, mockData, testDb).then(([income]) => {
      expect(income).toEqual(mockDataResponse)
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
