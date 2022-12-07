import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { postIncomes } from '../../../actions/incomes'
import { useDispatch } from 'react-redux'
import { Box, Button, TextField, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
import { currencyFormat } from '../../../utils/currencyFormat'

export default function IncomeForm({ handleClose, total }) {
  const dispatch = useDispatch()
  const { budgetId } = useParams()

  const defaultFormState = {
    name: { value: null, error: false, errorMessage: '' },
    amount: { value: null, error: false, errorMessage: 'Incorrect entry' },
  }
  const [formState, setFormState] = useState(defaultFormState)

  const handleChange = (e) => {
    const { name, value } = e.target

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
      start_date: new Date(Date.now),
      end_date: null,
      budget_id: budgetId,
    }

    if (
      formState.name.value &&
      formState.amount.value &&
      !formState.amount.error
    ) {
      dispatch(postIncomes(budgetId, newData))
      setFormState(defaultFormState)
    }
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      noValidate
      autoComplete="off"
    >
      <Box>
        <TextField
          id="income-name"
          label="Income Name"
          size="small"
          name="name"
          required
          inputProps={{ maxLength: 20 }}
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
      </Box>
      <Box
        component="div"
        sx={{
          height: 180,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 4,
        }}
      >
        <Box
          component="div"
          sx={{
            height: 50,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 4,
          }}
        >
          <Typography
            variant="p"
            sx={{ color: '#0F3D3E', fontWeight: 500, fontSize: 32 }}
          >
            {`${currencyFormat(total)}`}
          </Typography>
          <Typography variant="p" sx={{ color: '#0F3D3E', fontSize: 16 }}>
            {`TOTAL DISPOSABLE INCOME`}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="medium"
          startIcon={<AddCircleIcon />}
          onClick={handleSubmit}
        >
          Add another income
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<CloseIcon />}
          onClick={handleClose}
          sx={{ width: 100 }}
        >
          Close
        </Button>
      </Box>
    </Box>
  )
}
