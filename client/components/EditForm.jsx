import * as React from 'react'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem'
import { patchTransaction } from '../actions/transactions'

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

          <TextField
            style={{ marginTop: 20 }}
            label="Select an expense type"
            fullWidth
            select
            variant="outlined"
            name="expensesId"
            // value={category.expensesId}
            onChange={handleChange}
            id="category"
            margin="dense"
            helperText="Please select your expense type"
          >
            {category.map((option) => (
              <MenuItem key={option.expensesId} value={option.expensesId}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="dense"
            id="name"
            label="Give your expense a name"
            type="text"
            name="name"
            fullWidth
            variant="standard"
            value={data.name || ''}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            id="amount"
            label="Enter an amount"
            type="amount"
            name="amount"
            fullWidth
            variant="standard"
            value={data.amount || ''}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            id="date"
            type="date"
            name="dateCreated"
            fullWidth
            variant="standard"
            value={data.dateCreated || ''}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
