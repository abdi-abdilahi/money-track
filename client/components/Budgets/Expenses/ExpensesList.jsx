import React, { useState } from 'react'
import { postExpenses } from '../../../actions/expenses'
import { Box, Button, Grid } from '@mui/material/'
import { useParams } from 'react-router-dom'
import ExpensesForm from './ExpensesForm'
import ExpenseCard from './ExpensesCard'

export default function ExpensesList({ expenses }) {
  const { budgetId } = useParams()
  const [adding, setAdding] = useState(false)

  return (
    <Box>
      {expenses.loading && <p>Loading....</p>}
      {expenses.error && <p>expenses.error</p>}

      {adding && (
        <ExpensesForm
          title={'Add New Expense '}
          thunk={postExpenses}
          expensesData={{ name: '', amount: '', budget_id: budgetId }}
          setStatus={setAdding}
          firstParam={budgetId}
        />
      )}

      <Box
        className="add-btn"
        sx={{ display: 'flex', justifyContent: 'flex-end', m: 1, p: 1 }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setAdding(true)
          }}
        >
          Add New
        </Button>
      </Box>

      <Grid container spacing={{ xs: 4, md: 3 }}>
        {expenses.data?.map((expense, i) => {
          return (
            <Grid item key={i}>
              <ExpenseCard expense={expense} />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
