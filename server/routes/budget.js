const express = require('express')
const router = express.Router()

const db = require('../db/budget')

router.get('/', (req, res) => {
  //const auth0Id = req.auth?.sub
  const auth0Id = 2
  db.getBudgetByUserId(auth0Id)
    .then((budget) => {
      res.json(budget)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Something went wrong')
    })
})

router.post('/', (req, res) => {
  db.addBudget(req.body)
    .then(([budget]) => {
      res.json(budget)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Something went wrong')
    })
})

router.patch('/:budgetId', (req, res) => {
  const budgetId = req.params.budgetId
  const updatedBudget = req.body

  db.updateBudget(budgetId, updatedBudget)
    .then(([budget]) => {
      res.json(budget)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Something went wrong')
    })
})

router.delete('/:budgetId', (req, res) => {
  db.deleteBudget(req.params.budgetId)
    .then(() => {
      res.sendStatus(200)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Something went wrong')
    })
})

module.exports = router
