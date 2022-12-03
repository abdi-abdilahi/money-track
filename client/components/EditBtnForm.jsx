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

export default function Form({ expense, setUpdate }) {
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
      <Paper elevation={24}>
        <div>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Expense</InputLabel>
            <OutlinedInput
              id="outlined-adornment-expense"
              name="name"
              value={data.name}
              onChange={handleChange}
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
              value={data.amount}
              name="amount"
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
        </div>
        <div>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={() => setUpdate(false)}>
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
