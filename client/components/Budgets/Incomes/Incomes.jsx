import React, { useState } from 'react'
import { patchIncomes, delIncomes } from '../../../actions/incomes'
import { useDispatch } from 'react-redux'
import { Box, IconButton, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'

export default function Income({ income }) {
  const dispatch = useDispatch()
  const [updating, setUpdating] = useState(false)
  const [incomeData, setIncomeData] = useState({
    name: income.name,
    amount: income.amount,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUpdating(true)
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
    setUpdating(false)
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
        <Box
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <TextField
            id="income-name"
            label=""
            size="medium"
            name="name"
            value={incomeData.name}
            onChange={handleChange}
          />
          <TextField
            error={invalid}
            id="income-amount"
            label=""
            placeholder="Income after tax"
            size="medium"
            name="amount"
            value={incomeData.amount}
            onChange={handleChange}
          />
          {updating ? (
            <IconButton aria-label="delete" color="primary" type="submit">
              <SaveIcon fontSize="large" />
            </IconButton>
          ) : (
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={handleDelete}
            >
              <DeleteIcon fontSize="large" />
            </IconButton>
          )}
        </Box>
      </Box>
    </div>
  )
}
