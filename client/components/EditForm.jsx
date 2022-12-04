import * as React from 'react'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { patchTransaction } from '../actions/transactions'
import { Grid, Autocomplete } from '@mui/material'

export default function EditForm({ transaction, setUpdating }) {
  const [open, setOpen] = React.useState(true)
  const [data, setData] = React.useState(transaction)
  const dispatch = useDispatch()

  const handleClose = () => {
    setOpen(false)
    setUpdating(false)
  }

  function handleChange(e) {
    const { name, value } = e.target
    e.preventDefault()
    setData({ ...data, [name]: value })
  }

  function handleUpdate(e) {
    e.preventDefault()

    const updatedTransaction = {
      name: data.name,
      amount: data.amount,
      date_created: data.dateCreated,
      expenses_id: data.expensesId,
    }
    setUpdating(false)
    dispatch(patchTransaction(transaction, updatedTransaction))
    handleClose()
  }

  //USING DATA BELOW FOR POPULATING CATEGORY / EXPENSES TYPES
  //TODO - USE EXPENSES STATE

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

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit your expense by udpating the details below.
          </DialogContentText>
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
