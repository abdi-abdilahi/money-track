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
    <Box
      sx={{
        flexGrow: 1,
        width: '95%',
      }}
    >
      <Grid container spacing={1} style={{ fontWeight: 'bold' }} sx={{ mb: 2 }}>
        <Grid
          container
          item
          xs={12}
          style={{
            fontSize: '24px',
            display: 'flex',
            justifyContent: 'center',
            color: '#0F3D3E',
          }}
          sx={{ mb: 2 }}
        >
          Latest Transactions
        </Grid>
        <Grid
          container
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
          }}
          sx={{ color: '#0F3D3E' }}
        >
          <Grid item xs={4}>
            Name
          </Grid>
          <Grid item xs={4}>
            Type
          </Grid>
          <Grid item xs={2} style={{ textAlign: 'left' }}>
            Amount
          </Grid>
          <Grid item xs={2} style={{ textAlign: 'right' }}>
            Date
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ color: '#0F3D3E' }}>
        {latest?.map((recentTransaction, i) => (
          <Grid container key={i} sx={{ marginBottom: 1.5 }}>
            <Grid item xs={4}>
              {recentTransaction.name}
            </Grid>
            <Grid item xs={4} sx={{ color: '#0F3D3E' }}>
              {recentTransaction.expensesName}
            </Grid>
            <Grid item xs={2} style={{ textAlign: 'left' }}>
              {recentTransaction.amount}
            </Grid>
            <Grid item xs={2} style={{ textAlign: 'right' }}>
              {recentTransaction.dateCreated}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
