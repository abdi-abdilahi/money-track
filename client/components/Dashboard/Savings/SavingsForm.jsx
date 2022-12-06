import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from '@mui/material'
import { patchSavings, postSavings } from '../../../actions/savings'

export default function SavingsForm({ title, savingsData, setStatus }) {
  const [open, setOpen] = useState(true)
  const [formData, setFormData] = useState(savingsData)
  const dispatch = useDispatch()

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newSavings = {
      name: formData.name,
      amount: formData.amount,
      goal_date: formData.goalDate,
      budget_id: formData.budgetId,
    }
    if (title === 'Edit Saving') {
      dispatch(patchSavings(formData.id, newSavings))
    } else {
      dispatch(postSavings(formData.budgetId, newSavings))
    }
    setStatus(false)
  }

  function handleClose() {
    setOpen(false)
    setStatus(false)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          style={{ marginTop: 20 }}
          fullWidth
          id="outlined-adornment-savings"
          name="name"
          inputProps={{ maxLength: 20 }}
          value={formData.name}
          onChange={handleChange}
          label="Savings"
        />

        <TextField
          style={{ marginTop: 20 }}
          fullWidth
          id="outlined-adornment-savings"
          value={formData.amount}
          name="amount"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          onChange={handleChange}
          startadornment={<InputAdornment position="start">$</InputAdornment>}
          label="Amount"
        />
        <TextField
          style={{ marginTop: 20 }}
          type="date"
          name="goalDate"
          id="outlined-required"
          value={formData.goalDate || ''}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setStatus(false)}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Sumbit
        </Button>
      </DialogActions>
    </Dialog>
  )
}
