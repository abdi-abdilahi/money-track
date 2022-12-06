import React, { useState } from 'react'
import { patchIncomes, delIncomes } from '../../../actions/incomes'
import { useDispatch } from 'react-redux'
import { Box, IconButton, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'

export default function Income({ income }) {
  const [updating, setUpdating] = useState(false)
  const dispatch = useDispatch()

  const defaultFormState = {
    name: { value: income.name, error: false, errorMessage: '' },
    amount: {
      value: income.amount,
      error: false,
      errorMessage: 'Incorrect entry',
    },
  }
  const [formState, setFormState] = useState(defaultFormState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUpdating(true)
    if (name == 'amount') {
      setFormState({
        ...formState,
        amount: { ...formState.amount, value, error: isNaN(value) },
      })
    } else if (name == 'name') {
      setFormState({ ...formState, name: { ...formState.name, value } })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newData = {
      name: formState.name.value,
      amount: formState.amount.value,
    }

    if (
      formState.name.value &&
      formState.amount.value &&
      !formState.amount.error
    ) {
      dispatch(patchIncomes(income.id, newData))
      setUpdating(false)
    }
  }

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(delIncomes(Number(income.id)))
  }

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
            label="Income Name"
            size="small"
            name="name"
            required
            value={formState.name.value || ''}
            error={formState.name.error}
            onChange={handleChange}
          />
          <TextField
            id="income-amount"
            label="Income Amount"
            size="small"
            name="amount"
            required
            value={formState.amount.value || ''}
            error={formState.amount.error}
            helperText={formState.amount.error && formState.amount.errorMessage}
            onChange={handleChange}
          />
          {updating ? (
            <IconButton aria-label="delete" color="primary" type="submit">
              <SaveIcon fontSize="medium" />
            </IconButton>
          ) : (
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={handleDelete}
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>
          )}
        </Box>
      </Box>
    </div>
  )
}
