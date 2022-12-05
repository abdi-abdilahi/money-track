const express = require('express')
const path = require('path')

const transactions = require('./routes/transactions')
const expenses = require('./routes/expenses')
const incomes = require('./routes/incomes')
const budget = require('./routes/budget')
const saving = require('./routes/saving')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/transactions', transactions)
server.use('/api/v1/expenses', expenses)
server.use('/api/v1/incomes', incomes)
server.use('/api/v1/budget', budget)
server.use('/api/v1/saving', saving)

server.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})

module.exports = server
