import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTransactions } from '../../actions/transactions'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

export default function RecentTransactions() {
  const transactionsData = useSelector((state) => state.transactions)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [])

  const sortData =
    transactionsData.data?.sort(
      (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
    ) || null

  const latest = sortData?.filter((transaction, index) => {
    if (index < 5) {
      return transaction
    }
  })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} style={{ fontWeight: 'bold' }} sx={{ mb: 2 }}>
        <Grid item xs={3}>
          Name
        </Grid>
        <Grid item xs={3}>
          Type
        </Grid>
        <Grid item xs={3}>
          Amount
        </Grid>
        <Grid item xs={3}>
          Date
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        {latest?.map((recentTransaction, i) => (
          <Grid container key={i}>
            <Grid item xs={3}>
              {recentTransaction.name}
            </Grid>
            <Grid item xs={3}>
              {recentTransaction.expensesName}
            </Grid>
            <Grid item xs={3}>
              {recentTransaction.amount}
            </Grid>
            <Grid item xs={3}>
              {recentTransaction.dateCreated}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
