import React, { useState, useEffect } from 'react'
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
import { fetchExpenses } from '../../actions/expenses'

export default function TransactionsForm({
  transactionData,
  title,
  setStatus,
}) {
  const [open, setOpen] = useState(true)
  const [data, setData] = useState(transactionData)
  const categoryNames = useSelector((state) => state.expenses)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchExpenses(1))
  }, [])

  const handleClose = () => {
    setOpen(false)
    setStatus(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    e.preventDefault()
    setData({ ...data, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTransaction = {
      name: data.name,
      amount: data.amount,
      date_created: data.dateCreated,
      expenses_id: data.expensesId,
    }
    if (title === 'Edit Transaction') {
      dispatch(patchTransaction(data.id, newTransaction))
    } else {
      dispatch(postTransaction(newTransaction))
    }

    setStatus(false)
    handleClose()
  }

  const category = categoryNames.data?.map((category) => {
    return {
      label: category.name,
      expensesId: category.id,
    }
  })

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
                onChange={(_, value) => {
                  setData({ ...data, expensesId: value.expensesId })
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
                value={data.name || ''}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                type="amount"
                name="amount"
                label="Enter an amount"
                id="outlined-required"
                value={data.amount || ''}
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
                value={data.dateCreated || ''}
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
