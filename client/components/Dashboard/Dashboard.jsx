import React, { useEffect } from 'react'
import ExpensesPieChart from './ExpensesPieChart'
import { Paper, Box, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TransactionsBarChart from './TransactionsBarChart'
import RecentTransactions from './RecentTransactions'
import { useDispatch } from 'react-redux'
import SavingsList from './Savings/SavingsList'
import { fetchExpenses } from '../../actions/expenses'
import { fetchBudget } from '../../actions/budget'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchSavings } from '../../actions/savings'

function Dashboard() {
  const dispatch = useDispatch()
  const { getAccessTokenSilently } = useAuth0()
  useEffect(async () => {
    const token = await getAccessTokenSilently()
    dispatch(fetchBudget(token))
    dispatch(fetchExpenses(1))
    dispatch(fetchSavings(1))
  }, [])

  const theme = createTheme({
    palette: {
      primary: {
        main: '#0F3D3E',
        contrastText: '#fff',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Typography
        variant="p"
        sx={{
          fontSize: 32,
          fontWeight: 700,
          color: '#0F3D3E',
        }}
      >
        Dashboard
      </Typography>

      <Box
        className="container"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '90vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 2,
            }}
          >
            <Box>
              <SavingsList />
            </Box>
            <Box sx={{ maxWidth: 600 }}>
              <Paper
                elevation={3}
                sx={{
                  minWidth: 600,
                  height: 300,
                  marginTop: 6,
                  borderRadius: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#FFFFFF',
                }}
              >
                <RecentTransactions />
              </Paper>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 4,
              maxHeight: 380,
            }}
          >
            <TransactionsBarChart />

            <ExpensesPieChart />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Dashboard
