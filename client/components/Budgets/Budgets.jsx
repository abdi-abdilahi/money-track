import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchExpenses } from '../../actions/expenses'
import { fetchIncomes } from '../../actions/incomes'
import { Box, Typography } from '@mui/material'
import IncomesInfo from './Incomes/IncomesInfo'
import ExpensesList from './Expenses/ExpensesList'
import BudgetTimeframe from './BudgetTimeframe'

export default function Budgets() {
  const expenses = useSelector((state) => state.expenses)
  const incomes = useSelector((state) => state.incomes)
  const dispatch = useDispatch()
  const { budgetId } = useParams()

  useEffect(() => {
    dispatch(fetchIncomes(budgetId))
    dispatch(fetchExpenses(budgetId))
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        maxHeight: '90%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
          marginTop: 5,
        }}
      >
        <Typography variant="h2">Expenses</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 5,
            marginBottom: 15,
          }}
        >
          <IncomesInfo incomes={incomes} expenses={expenses} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ color: '#3277d5', marginRight: 4 }}>
              Budget Timeframe:
            </Typography>
            <BudgetTimeframe />
          </Box>
        </Box>
        <ExpensesList />
      </Box>
    </Box>
  )
}
