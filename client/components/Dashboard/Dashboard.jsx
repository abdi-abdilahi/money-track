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

function Dashboard() {
  const dispatch = useDispatch()
  const { getAccessTokenSilently } = useAuth0()
  useEffect(async () => {
    const token = await getAccessTokenSilently()
    dispatch(fetchBudget(token))
    dispatch(fetchExpenses(1))
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
            <SavingsList />
            <Box sx={{ maxWidth: '35vw' }}>
              <Paper
                sx={{
                  width: '100%',
                  height: 300,
                  padding: 2,
                  marginTop: 6,
                  borderRadius: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background:
                    'linear-gradient(13deg, rgba(249,246,237,1) 0%, rgba(241,241,241,0.8699068983061975) 53%)',
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
              marginTop: 2,
              maxHeight: 300,
            }}
          >
            <Box sx={{ pr: 2 }}>
              <TransactionsBarChart />
            </Box>
            <Box>
              <ExpensesPieChart />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Dashboard
