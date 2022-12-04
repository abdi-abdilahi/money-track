const express = require('express')
const router = express.Router()

const db = require('../db/incomes')

router.get('/:budgetId', (req, res) => {
  db.getIncomesByBudgetId(req.params.budgetId)
    .then((incomes) => {
      res.json(incomes)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Something went wrong')
    })
})

router.post('/:budgetId', (req, res) => {
  db.addIncomes(req.body)
    .then(([incomes]) => {
      res.json(incomes)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Something went wrong')
    })
})

router.patch('/:incomeId', (req, res) => {
  const incomeId = req.params.incomeId
  const updatedIncomes = req.body

  db.updateIncome(incomeId, updatedIncomes)
    .then(([income]) => {
      res.json(income)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ errorMessage: 'Something went wrong' })
    })
})

router.delete('/:incomeId', (req, res) => {
  db.deleteIncome(req.params.incomeId)
    .then(() => {
      res.sendStatus(200)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ errorMessage: 'Something went wrong' })
    })
})

module.exports = router
