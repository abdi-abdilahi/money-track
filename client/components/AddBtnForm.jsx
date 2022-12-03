//btn: when you click will --> popup form like the edit btn form
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
import { postExpenses } from '../actions/expenses'

const formData = { name: '', amount: '', budget_id: 1 }

export default function AddBtnForm({ setAdding }) {
  //const [add, setAdd] = useState(true)
  const [form, setForm] = useState(formData)
  const dispatch = useDispatch()
  console.log('formData', formData)

  function handleChange(e) {
    const { name, value } = e.target
    console.log('e.target', e.target)
    setForm({ ...form, [name]: value })
  }
  function handleAdd(e) {
    console.log('working')
    e.preventDefault()
    dispatch(postExpenses(1, form))

    setAdding(false)
    setForm(formData)
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
              name="amount"
              value={form.amount}
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
            <Button variant="outlined" onClick={() => setAdding(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleAdd}>
              Add
            </Button>
          </Stack>
        </div>
      </Paper>
    </Box>
  )
}
