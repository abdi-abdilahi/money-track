import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postTransaction } from '../actions/transactions'
import TextField from '@mui/material/TextField'

import { Card, CardContent, Grid, Button, Autocomplete } from '@mui/material'

export default function AddTransactions() {
  //const categoryNames = useSelector((state) => state.transactions) // use state.expenses
  //Adding categoryName data for testing...
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
  const [data, setData] = useState([])
  const dispatch = useDispatch()

  function handleChange(e) {
    const { name, value } = e.target
    console.log(name)
    e.preventDefault()
    setData({ ...data, [name]: value })
    console.log('m data from handleChange', data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const newTransaction = {
      name: data.name,
      amount: data.amount,
      date_created: data.dateCreated,
      expenses_id: data.expensesId,
    }
    dispatch(postTransaction(newTransaction))
  }

  const category = categoryNames.map((category) => {
    return {
      label: category.name,
      expensesId: category.id,
    }
  })

  return (
    <Card style={{ maxWidth: 800 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid xs={12} sm={6} item>
              <Autocomplete
                id="expense-list"
                name="expensesId"
                options={category}
                onChange={(_, value) => {
                  console.log('m value', value)
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
      </CardContent>
    </Card>
  )
}
