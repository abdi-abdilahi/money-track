import React, { useState } from 'react'
import { postIncomes } from '../../../actions/incomes'
import { useDispatch } from 'react-redux'
import { Box, Button, TextField } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'

export default function IncomeForm({ setAdding }) {
  const dispatch = useDispatch()

  const defaultData = {
    name: '',
    amount: '',
    start_date: new Date(Date.now),
    end_date: null,
    budget_id: 1,
  }

  const [income, setIncome] = useState(defaultData)

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name == 'amount' && !isNaN(value)) {
      setIncome({
        ...income,
        amount: value,
      })
    } else if (name == 'name') {
      setIncome({
        ...income,
        name: value,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(postIncomes(1, income))
    setIncome(defaultData)
  }
  const invalid = false

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="income-name"
            label="Income Name"
            size="small"
            name="name"
            value={income.name}
            onChange={handleChange}
          />
          <TextField
            error={invalid}
            id="income-amount"
            label="Income Amount"
            placeholder="Income after tax"
            size="small"
            name="amount"
            value={income.amount}
            onChange={handleChange}
          />
          <Button
            variant="outlined"
            size="medium"
            startIcon={<AddCircleIcon />}
            onClick={handleSubmit}
          >
            Add another income
          </Button>
        </div>
      </Box>
      <Button
        variant="outlined"
        size="small"
        startIcon={<CloseIcon />}
        onClick={() => setAdding(false)}
      >
        Close
      </Button>
    </>
  )
}
