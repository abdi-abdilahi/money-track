const request = require('supertest')
const server = require('../../server')

jest.mock('../../db/transactions')
jest.spyOn(console, 'error').mockImplementation(() => {})

afterAll(() => {
  jest.restoreAllMocks()
})
