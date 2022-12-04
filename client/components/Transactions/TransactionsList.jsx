import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTransactions } from '../../actions/transactions'
import TransactionsForm from './TransactionsForm'
import Button from '@mui/material/Button'
import TransactionsTable from './Table/TransactionsTable'
import { Grid, Autocomplete, TextField } from '@mui/material'

export default function TransactionList() {
  const transactions = useSelector((state) => state.transactions)
  const [adding, setAdding] = useState(false)
  const rows = transactions.data || []
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [])

  const transactionsList = rows?.map((transaction) => {
    return {
      label: transaction.name,
      id: transaction.id,
      dateCreated: transaction.dateCreated,
    }
  })

  return (
    <>
      {adding ? (
        <TransactionsForm
          transactionData={{}}
          title={'Add New Transaction'}
          setStatus={setAdding}
        />
      ) : null}

      <Grid container spacing={2}>
        <Grid xs={12} sm={6} item>
          <Autocomplete
            id="search-transactions"
            name="transaction"
            options={transactionsList}
            onChange={(_, value) => {
              console.log('m value', value)
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
        <Button
          variant="contained"
          size="medium"
          onClick={() => setAdding(true)}
        >
          Add Transaction
        </Button>
      </div>

      <TransactionsTable rows={rows} />
    </>
  )
}
