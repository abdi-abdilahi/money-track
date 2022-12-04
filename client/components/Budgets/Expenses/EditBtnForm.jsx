import React, { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { patchExpense } from '../../../actions/expenses'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function EditBtnForm({ expense, setUpdate }) {
  const [open, setOpen] = useState(true)
  const [data, setData] = useState(expense)
  const dispatch = useDispatch()

  function handleChange(e) {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  function handleUpdate(e) {
    e.preventDefault()
    dispatch(patchExpense(expense, data))
    setUpdate(false)
  }

  function handleClose() {
    setOpen(false)
    setUpdate(false)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Expense </DialogTitle>
      <DialogContent>
        <DialogContentText>Edit you expense here</DialogContentText>
        <TextField
          style={{ marginTop: 20 }}
          fullWidth
          id="outlined-adornment-expense"
          name="name"
          value={data.name}
          onChange={handleChange}
          label="Expense"
        />

        <TextField
          style={{ marginTop: 20 }}
          fullWidth
          id="outlined-adornment-expense"
          value={data.amount}
          name="amount"
          onChange={handleChange}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Amount"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setUpdate(false)}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleUpdate}>
          Sumbit
        </Button>
      </DialogActions>
    </Dialog>
  )
}
