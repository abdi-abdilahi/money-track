import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTransactions } from '../../actions/transactions'
import { fetchExpenses } from '../../actions/expenses'
import { fetchIncomes } from '../../actions/incomes'
import { fetchBudget } from '../../actions/budget'
import { Box, Typography } from '@mui/material'
import IncomesInfo from './Incomes/IncomesInfo'
import ExpensesList from './Expenses/ExpensesList'
import BudgetTimeframe from './BudgetTimeframe'

export default function Budgets() {
  const budget = useSelector((state) => state.budget)
  const incomes = useSelector((state) => state.incomes)
  const expenses = useSelector((state) => state.expenses)

  const { budgetId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchIncomes(budgetId))
    dispatch(fetchExpenses(budgetId))
    dispatch(fetchTransactions())
    dispatch(fetchBudget())
    dispatch(fetchTransactions())
  }, [])

  return (
    <Box
      className="container"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        maxHeight: '98vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '94vh',
        }}
      >
        <Typography variant="h3" sx={{ color: '#0F3D3E' }}>
          Expenses
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 5,
            marginBottom: '15vh',
          }}
        >
          <IncomesInfo incomes={incomes} expenses={expenses} />

          {budget.data && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h5"
                sx={{ color: '#0F3D3E', marginRight: 4 }}
              >
                Budget Timeframe:
              </Typography>
              <BudgetTimeframe budget={budget.data[0]} />
            </Box>
          )}
        </Box>

        <ExpensesList expenses={expenses} />
      </Box>
    </Box>
  )
}
