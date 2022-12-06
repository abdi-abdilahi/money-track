import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTransactions } from '../../actions/transactions'
import TransactionsForm from './TransactionsForm'
import Button from '@mui/material/Button'
import TransactionsTable from './Table/TransactionsTable'
import { Box, Grid, Autocomplete, TextField, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0F3D3E',
      contrastText: '#fff',
    },
  },
})

export default function TransactionList() {
  const transactions = useSelector((state) => state.transactions)
  const [searchTransaction, setSearchTransaction] = useState({
    label: 'Search',
  })
  const [filterData, setFilterData] = useState(null)
  const [adding, setAdding] = useState(false)
  const rows = transactions.data || []
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [])

  useEffect(() => {
    if (!searchTransaction?.label) {
      setFilterData(rows)
    }
  }, [searchTransaction])

  const transactionsList = rows?.map((transaction) => {
    return {
      label: transaction.name,
    }
  })

  const searchResult = rows.filter((row) => {
    if (row.name.toLowerCase().includes(searchTransaction?.label)) {
      return row
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Box
        className="container"
        sx={{
          maxWidth: 1500,
          height: '91vh',
        }}
      >
        <Typography variant="h4" sx={{ color: '#0F3D3E' }}>
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
            <Button variant="contained" onClick={() => setAdding(true)}>
              Add Transaction
            </Button>
          </Grid>
        </Grid>
        <TransactionsTable rows={filterData || rows} />
      </Box>
    </ThemeProvider>
  )
}
