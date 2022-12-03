//btn: when you click will --> popup form like the edit btn form
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Paper from '@mui/material/Paper'

const formData = { name: '', amount: '' }
export default function AddBtnForm() {
  const [form, setForm] = useState(formData)

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
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
              value={form.name}
              onChange={handleChange}
              label="Expense"
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={form.amount}
              name="amount"
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
        </div>
      </Paper>
    </Box>
  )
}
