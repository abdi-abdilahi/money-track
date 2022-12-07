const express = require('express')
const checkJwt = require('../auth0')
const router = express.Router()

const db = require('../db/budget')

router.get('/', checkJwt, (req, res) => {
  const auth0Id = req.auth?.sub
  db.getBudgetByUserId(auth0Id)
    .then((budget) => {
      res.json(budget)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Something went wrong')
    })
})

router.post('/', checkJwt, (req, res) => {
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
