const express = require('express')
const router = express.Router()
const db = require('../db/transactions')

router.get('/', (req, res) => {
  db.getTransactions()
    .then((transactions) => {
      res.json(transactions)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ errorMessage: 'Something went wrong' })
    })
})

router.post('/', (req, res) => {
  db.addTransaction(req.body)
    .then(([{ id }]) => {
      return db.getTransactionById(id)
    })
    .then((transaction) => {
      res.json(transaction)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ errorMessage: 'Something went wrong' })
    })
})

router.patch('/:transactionId', (req, res) => {
  const transactionId = req.params.transactionId
  const updatedTransaction = req.body
  db.updateTransaction(transactionId, updatedTransaction)
    .then(() => {
      return db.getTransactionById(transactionId)
    })
    .then((transactions) => {
      res.json(transactions)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ errorMessage: 'Something went wrong' })
    })
})

router.delete('/:transactionId', (req, res) => {
  db.deleteTransaction(req.params.transactionId)
    .then(() => {
      res.sendStatus(200)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ errorMessage: 'Something went wrong' })
    })
})

module.exports = router
