const express = require('express')
const db = require('../db/expenses')
const router = express.Router()

router.get('/:budgetId', (req, res) => {
  db.getExpenses(req.params.budgetId)
    .then((expenses) => {
      res.json(expenses)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Something went wrong')
    })
})

router.post('/:budgetId', (req, res) => {
  db.addExpense(req.body)
    .then(([expense]) => {
      res.json(expense)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Someting went wrong')
    })
})

router.patch('/:expenseId', (req, res) => {
  const expenseId = req.params.expenseId
  db.updateExpense(expenseId, req.body)
    .then(([expense]) => {
      res.json(expense)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Something went wrong')
    })
})

router.delete('/:expenseId', (req, res) => {
  db.deleteExpense(req.params.expenseId)
    .then(() => {
      res.sendStatus(200)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Something went wrong')
    })
})

module.exports = router
