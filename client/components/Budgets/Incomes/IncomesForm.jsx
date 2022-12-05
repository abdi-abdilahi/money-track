import React, { useState } from 'react'
import { postIncomes } from '../../../actions/incomes'
import { useDispatch } from 'react-redux'
import { Box, Button, TextField, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'

export default function IncomeForm({ handleClose, total }) {
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="income-name"
            label="Income Name"
            size="medium"
            name="name"
            value={income.name}
            onChange={handleChange}
          />
          <TextField
            error={invalid}
            id="income-amount"
            label="Income Amount"
            placeholder="Income after tax"
            size="medium"
            name="amount"
            value={income.amount}
            onChange={handleChange}
          />
        </div>
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
            <Typography variant="h4" sx={{ color: '#3277d5' }}>
              {`$${total}`}
            </Typography>
            <Typography variant="p" sx={{ color: '#3277d5' }}>
              {`TOTAL WEEKLY DISPOSABLE INCOME`}
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
    </>
  )
}
