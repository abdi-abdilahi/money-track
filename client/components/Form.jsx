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

export default function Form(expense, setUpdate) {
  const [data, setData] = useState(expense)
  const dispatch = useDispatch()

  function handleChange(e) {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  function handleUpdate(e) {
    e.preventDefault()
    const updatedExpense = {
      name: data.name,
      amount: data.amount,
    }
    dispatch(patchExpense(data, updatedExpense))
    setUpdate(false)
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Paper elevation={24}>
        <div>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Expense</InputLabel>
            <OutlinedInput
              id="outlined-adornment-expense"
              value={expense.name}
              onChange={handleChange('amount')}
              label="Expense"
            />
            {/* <TextField
            label="Expense"
            id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
          /> */}
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={expense.amount}
              onChange={handleChange('amount')}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
        </div>
        <div>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={() => setUpdate(true)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleUpdate}>
              Sumbit
            </Button>
          </Stack>
        </div>
      </Paper>
    </Box>
  )
}
