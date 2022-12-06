import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postTransaction, patchTransaction } from '../../actions/transactions'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Autocomplete,
} from '@mui/material'

export default function TransactionsForm({
  transactionData,
  title,
  setStatus,
}) {
  const categoryNames = useSelector((state) => state.expenses)
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch()
  const category = categoryNames.data?.map((category) => {
    return {
      label: category.name,
      expensesId: category.id,
    }
  })

  const defaultFormState = {
    expensesId: {
      value: transactionData.expensesId,
      error: false,
      errorMessage: '',
    },
    dateCreated: {
      value:
        transactionData.dateCreated ||
        new Date(Date.now()).toISOString().split('T')[0],
      error: false,
      errorMessage: 'Incorrect entry',
    },
    name: { value: transactionData.name, error: false, errorMessage: '' },
    amount: {
      value: transactionData.amount,
      error: false,
      errorMessage: 'Incorrect entry',
    },
  }
  const [formState, setFormState] = useState(defaultFormState)
  const [searchTransaction, setSearchTransaction] = useState({
    label: transactionData.expensesName || '',
    expensesId: transactionData.expensesId || 0,
  })

  const handleClose = () => {
    setOpen(false)
    setStatus(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name == 'amount') {
      setFormState({
        ...formState,
        amount: { ...formState.amount, value, error: isNaN(value) },
      })
    } else {
      setFormState({ ...formState, [name]: { ...formState.name, value } })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newData = {
      name: formState.name.value,
      amount: formState.amount.value,
      date_created: formState.dateCreated.value,
      expenses_id: formState.expensesId.value,
    }

    if (
      formState.expensesId.value &&
      formState.name.value &&
      formState.dateCreated.value &&
      formState.amount.value &&
      !formState.amount.error
    ) {
      if (title === 'Edit Transaction') {
        dispatch(patchTransaction(transactionData.id, newData))
      } else {
        dispatch(postTransaction(newData))
      }

      setStatus(false)
      handleClose()
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid xs={12} sm={6} item>
              <Autocomplete
                id="expense-list"
                name="expensesId"
                options={category}
                defaultValue={{
                  label: transactionData.expensesName || '',
                  expensesId: transactionData.expensesId || 0,
                }}
                onInputChange={(_, value) => {
                  setSearchTransaction({
                    ...searchTransaction,
                    label: value || '',
                  })
                }}
                onChange={(_, value) => {
                  setSearchTransaction({
                    ...searchTransaction,
                    label: value?.label || '',
                  })
                  setFormState({
                    ...formState,
                    expensesId: {
                      ...formState.expensesId,
                      value: value?.expensesId || 0,
                    },
                  })
                }}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                renderInput={(params) => (
                  <TextField {...params} label="Select an expense type" />
                )}
                fullWidth
              />
            </Grid>

            <Grid xs={12} sm={6} item>
              <TextField
                label="Give your expense a name"
                id="outlined-required"
                name="name"
                value={formState.name.value || ''}
                error={formState.name.error}
                onChange={handleChange}
                fullWidth
                inputProps={{ maxLength: 20 }}
                required
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                type="amount"
                name="amount"
                label="Enter an amount"
                id="outlined-required"
                value={formState.amount.value || ''}
                error={formState.amount.error}
                helperText={
                  formState.amount.error && formState.amount.errorMessage
                }
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                type="date"
                name="dateCreated"
                id="outlined-required"
                value={formState.dateCreated.value}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
