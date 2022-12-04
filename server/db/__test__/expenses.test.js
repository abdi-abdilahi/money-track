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
