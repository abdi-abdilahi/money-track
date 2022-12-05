import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchExpenses, postExpenses } from '../../../actions/expenses'
import { Box, Button, Grid } from '@mui/material/'

import ExpensesForm from './ExpensesForm'
import ExpenseCard from './ExpensesCard'
import { useParams } from 'react-router-dom'

export default function ExpensesList() {
  const { budgetId } = useParams()
  const expenses = useSelector((state) => state.expenses)
  const dispatch = useDispatch()
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    dispatch(fetchExpenses(1))
  }, [])

  return (
    <>
      {expenses.loading && <p>Loading....</p>}
      {expenses.error && <p>expenses.error</p>}

      {adding ? (
        <ExpensesForm
          title={'Add New Expense '}
          thunk={postExpenses}
          expensesData={{ name: '', amount: '', budget_id: budgetId }}
          setStatus={setAdding}
          firstParam={budgetId}
        />
      ) : (
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
      )}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
        {expenses.data?.map((expense, i) => {
          return (
            <Grid key={i} container direction="row" spacing="2">
              <Grid item>
                <ExpenseCard expense={expense} />
              </Grid>
            </Grid>
          )
        })}
      </Box>
    </>
  )
}
