const request = require('supertest')
const server = require('../../server')

jest.mock('../../db/expenses')
jest.spyOn(console, 'error').mockImplementation(() => {})

afterAll(() => {
  jest.restoreAllMocks()
})
