import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'

export default function ExpenseForm({
  title,
  thunk,
  expensesData,
  setStatus,
  firstParam,
}) {
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch()

  const defaultFormState = {
    name: { value: expensesData.name, error: false, errorMessage: '' },
    amount: {
      value: expensesData.amount,
      error: false,
      errorMessage: 'Incorrect entry',
    },
  }
  const [formState, setFormState] = useState(defaultFormState)

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name == 'amount') {
      setFormState({
        ...formState,
        amount: { ...formState.amount, value, error: isNaN(value) },
      })
    } else if (name == 'name') {
      setFormState({ ...formState, name: { ...formState.name, value } })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newData = {
      name: formState.name.value,
      amount: formState.amount.value,
      budget_id: formState.budgetId,
    }

    if (
      formState.name.value &&
      formState.amount.value &&
      !formState.amount.error
    ) {
      dispatch(thunk(firstParam, newData))
      setStatus(false)
    }
  }

  function handleClose() {
    setOpen(false)
    setStatus(false)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ color: '#0F3D3E', fontWeight: 500, fontSize: 24 }}>
        {title}
      </DialogTitle>
      <DialogContent dividers={true}>
        <TextField
          id="expense-name"
          label="Expense"
          name="name"
          value={formState.name.value || ''}
          error={formState.name.error}
          onChange={handleChange}
          fullWidth
          inputProps={{ maxLength: 20 }}
          style={{ marginTop: 20 }}
        />

        <TextField
          id="expense-amount"
          label="Amount"
          name="amount"
          value={formState.amount.value || ''}
          error={formState.amount.error}
          helperText={formState.amount.error && formState.amount.errorMessage}
          onChange={handleChange}
          fullWidth
          style={{ marginTop: 20 }}
        />
      </DialogContent>
      <DialogActions sx={{ margin: 1 }}>
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
