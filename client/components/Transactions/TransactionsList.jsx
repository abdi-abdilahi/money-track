import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTransactions } from '../../actions/transactions'
import TransactionsForm from './TransactionsForm'
import Button from '@mui/material/Button'
import TransactionsTable from './Table/TransactionsTable'
import { Box, Grid, Autocomplete, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function TransactionList() {
  const transactions = useSelector((state) => state.transactions)
  const [adding, setAdding] = useState(false)
  const rows = transactions.data || []
  const [filterData, setFilterData] = useState(null)
  const [searchTransaction, setSearchTransaction] = useState({
    label: 'Search',
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [])

  const transactionsList = rows?.map((transaction) => {
    return {
      label: transaction.name,
    }
  })

  useEffect(() => {
    if (!searchTransaction?.label.length) {
      setFilterData(rows)
    }
  }, [searchTransaction])

  const searchResult = rows.filter((row) => {
    if (row.name.toLowerCase().includes(searchTransaction?.label)) {
      return row
    }
  })

  function handleSearch(e) {
    e.preventDefault()
    setFilterData(searchResult)
  }

  return (
    <Box
      sx={{
        maxWidth: 1500,
        height: '93vh',
      }}
    >
      {transactions.loading && <p>Loading....</p>}
      {transactions.error && <p>expenses.error</p>}

      <Typography variant="h3" sx={{ color: '#0F3D3E' }}>
        Transactions
      </Typography>

      {adding && (
        <TransactionsForm
          transactionData={{}}
          title={'Add New Transaction'}
          setStatus={setAdding}
        />
      )}

      <Grid container spacing={1} sx={{ my: 2, width: 600 }}>
        <Grid xs={12} sm={6} item>
          <Autocomplete
            freeSolo
            autoComplete={true}
            id="search-transactions"
            name="transaction"
            options={transactionsList}
            onInputChange={(_, value) => {
              setSearchTransaction({ label: value })
              setFilterData(searchResult)
            }}
            onChange={(_, value) => {
              setSearchTransaction(value)
            }}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            renderInput={(params) => (
              <TextField {...params} label="Search..." />
            )}
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}
      >
        <Grid item>
          <Button
            variant="contained"
            size="medium"
            onClick={() => setAdding(true)}
          >
            Add Transaction
          </Button>
        </Grid>
      </Grid>
      <TransactionsTable rows={filterData || rows} />
    </Box>
  )
}
