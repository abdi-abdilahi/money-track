import React, { useState } from 'react'
import { patchIncomes, delIncomes } from '../../../actions/incomes'
import { useDispatch } from 'react-redux'
import { Box, IconButton, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export default function Income({ income }) {
  const [incomeData, setIncomeData] = useState({
    name: income.name,
    amount: income.amount,
  })
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name == 'amount' && !isNaN(value)) {
      setIncomeData({
        ...incomeData,
        amount: value,
      })
    } else if (name == 'name') {
      setIncomeData({
        ...incomeData,
        name: value,
      })
    }
  }

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(delIncomes(Number(income.id)))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(patchIncomes(Number(income.id), incomeData))
  }
  const invalid = false
  return (
    <div>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            id="income-name"
            label=""
            size="small"
            name="name"
            value={incomeData.name}
            onChange={handleChange}
          />
          <TextField
            error={invalid}
            id="income-amount"
            label=""
            placeholder="Income after tax"
            size="small"
            name="amount"
            value={incomeData.amount}
            onChange={handleChange}
          />
          <button type="submit" hidden />
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </Box>
    </div>
  )
}
