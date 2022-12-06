const express = require('express')
const router = express.Router()

const db = require('../db/savings')

router.get('/:budgetId', (req, res) => {
  //const auth0Id = req.auth?.sub
  //const auth0Id = 2
  db.getSavingsByBudgetId(req.params.budgetId)
    .then((saving) => {
      res.json(saving)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Something went wrong')
    })
})

router.post('/:budgetId', (req, res) => {
  db.addSaving(req.body)
    .then(([saving]) => {
      res.json(saving)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Something went wrong')
    })
})

router.patch('/:savingId', (req, res) => {
  const savingId = req.params.savingId
  const updatedSaving = req.body

  db.updateSaving(savingId, updatedSaving)
    .then(([saving]) => {
      res.json(saving)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Something went wrong')
    })
})

router.delete('/:savingId', (req, res) => {
  db.deleteSaving(req.params.savingId)
    .then(() => {
      res.sendStatus(200)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Something went wrong')
    })
})

module.exports = router
