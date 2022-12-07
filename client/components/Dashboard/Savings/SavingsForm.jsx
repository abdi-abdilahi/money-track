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
  const dispatch = useDispatch()

  const defaultFormState = {
    name: { value: savingsData.name, error: false, errorMessage: '' },
    amount: {
      value: savingsData.amount,
      error: false,
      errorMessage: 'Incorrect entry',
    },
    goalDate: {
      value:
        savingsData.goalDate ||
        new Date(Date.now()).toISOString().split('T')[0],
      error: false,
      errorMessage: '',
    },
  }

  const [formState, setFormState] = useState(defaultFormState)

  function handleChange(e) {
    const { name, value } = e.target
    if (name == 'amount') {
      setFormState({
        ...formState,
        amount: { ...formState.amount, value, error: isNaN(value) },
      })
    } else {
      setFormState({ ...formState, [name]: { ...formState.name, value } })
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newSavings = {
      name: formState.name.value,
      amount: formState.amount.value,
      goal_date: formState.goalDate.value,
      budget_id: formState.budgetId.value,
    }
    if (
      formState.name.value &&
      formState.goalDate.value &&
      formState.amount.value &&
      !formState.amount.error
    ) {
      if (title === 'Edit Saving') {
        dispatch(patchSavings(savingsData.id, newSavings))
      } else {
        dispatch(postSavings(savingsData.budgetId, newSavings))
      }
      setStatus(false)
    }
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
          value={formState.name.value || ''}
          error={formState.name.error}
          inputProps={{ maxLength: 10 }}
          onChange={handleChange}
          label="Savings"
        />

        <TextField
          style={{ marginTop: 20 }}
          fullWidth
          id="outlined-adornment-savings"
          name="amount"
          value={formState.amount.value || ''}
          error={formState.amount.error}
          helperText={formState.amount.error && formState.amount.errorMessage}
          onChange={handleChange}
          startadornment={<InputAdornment position="start">$</InputAdornment>}
          label="Amount"
        />
        <TextField
          style={{ marginTop: 20 }}
          type="date"
          name="goalDate"
          id="outlined-required"
          value={formState.goalDate.value}
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
