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

export default function ExpenseForm({
  title,
  thunk,
  expensesData,
  setStatus,
  firstParam,
}) {
  const [open, setOpen] = useState(true)
  const [formData, setFormData] = useState(expensesData)
  const dispatch = useDispatch()

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(thunk(firstParam, formData))
    setStatus(false)
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
          style={{ marginTop: 20 }}
          fullWidth
          id="expense-name"
          name="name"
          inputProps={{ maxLength: 20 }}
          value={formData.name}
          onChange={handleChange}
          label="Expense"
        />

        <TextField
          style={{ marginTop: 20 }}
          fullWidth
          id="expense-amount"
          value={formData.amount}
          name="amount"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          onChange={handleChange}
          startadornment={<InputAdornment position="start">$</InputAdornment>}
          label="Amount"
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
