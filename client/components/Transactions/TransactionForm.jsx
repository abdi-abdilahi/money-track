import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Grid, Autocomplete } from '@mui/material'
import { postTransaction } from '../actions/transactions'

export default function Addtransaction({ transactions }) {
  //const transactions = useSelector((state) => state.transactions)
  //console.log('m transactions', transactions)
  const [open, setOpen] = React.useState(false)
  const [data, setData] = useState([])
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
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
    dispatch(postTransaction(newTransaction))
    handleClose()
  }

  const categoryNames = [
    { id: 1, name: 'Petrol', amount: 50, budget_id: 1 },
    { id: 2, name: 'Fitness', amount: 15, budget_id: 1 },
    { id: 3, name: 'Groceries', amount: 175, budget_id: 1 },
    { id: 4, name: 'Health Insurance', amount: 50, budget_id: 1 },
    { id: 5, name: 'Car Insurance', amount: 20, budget_id: 1 },
    { id: 6, name: 'Car Maintenance', amount: 50, budget_id: 1 },
    { id: 7, name: 'Shopping', amount: 25, budget_id: 1 },
    { id: 8, name: 'Food/Dining Out', amount: 25, budget_id: 1 },
  ]

  const category = categoryNames.map((category) => {
    return {
      label: category.name,
      expensesId: category.id,
    }
  })

  const transactionsList = transactions?.map((transaction) => {
    return {
      label: transaction.name,
      id: transaction.id,
      dateCreated: transaction.dateCreated,
    }
  })

  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6} item>
          <Autocomplete
            id="search-transactions"
            name="transaction"
            options={transactionsList}
            onChange={(_, value) => {
              console.log('m value', value)
              setData({
                ...data,
                id: value.id,
                dateCreated: value.dateCreated,
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
        <Grid item>
          <Button type="submit" variant="contained" fullWidth>
            Search
          </Button>
        </Grid>
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" size="medium" onClick={handleClickOpen}>
          Add Transaction
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add your expense by filling out the fields below.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
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
              <Grid item>
                <Button type="submit" variant="contained" fullWidth>
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
