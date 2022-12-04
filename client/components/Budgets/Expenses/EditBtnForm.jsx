import React, { useState } from 'react'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { patchExpense } from '../actions/expenses'

export default function EditBtnForm({ expense, setUpdate }) {
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

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Paper elevation={24} sx={{ width: 425 }}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Expense</InputLabel>
          <OutlinedInput
            sx={{ width: 400 }}
            id="outlined-adornment-expense"
            name="name"
            value={data.name}
            onChange={handleChange}
            label="Expense"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            sx={{ width: 400 }}
            id="outlined-adornment-amount"
            value={data.amount}
            name="amount"
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
        <Stack spacing={2} direction="row" sx={{ m: 1, p: 1 }}>
          <Button variant="outlined" onClick={() => setUpdate(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleUpdate}>
            Sumbit
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
