import React, { useEffect } from 'react'
import ExpensesPieChart from './ExpensesPieChart'
import { Grid, Paper } from '@mui/material'

import TransactionsBarChart from './TransactionsBarChart'
import RecentTransactions from './RecentTransactions'
import { useDispatch } from 'react-redux'
import SavingsList from './Savings/SavingsList'
import { fetchExpenses } from '../../actions/expenses'

function Dashboard() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchExpenses(1))
  }, [])

  return (
    <div>
      <Grid container>
        <Grid item xs={8}>
          <SavingsList />
        </Grid>
        <Grid
          item
          xs={4}
          container
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Paper
            sx={{
              width: '600',
              height: 250,
              padding: 2,
              borderRadius: 5,
            }}
          >
            <RecentTransactions />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TransactionsBarChart />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ExpensesPieChart />
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
