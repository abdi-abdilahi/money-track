import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchExpenses, postExpenses } from '../../../actions/expenses'
import { Box, Button, Grid } from '@mui/material/'

//import TransactionsList from '../../Transactions/TransactionsList'
import ExpensesForm from './ExpensesForm'
import ExpenseCard from './ExpensesCard'
import { useParams } from 'react-router-dom'

export default function ExpensesList({ expenses }) {
  //console.log(expenses)
  const { budgetId } = useParams()
  //const transactions = useSelector((state) => state.transactions)
  // Temp transactions, to be replaced by the above when transactions feature is finished
  const transactions = [
    {
      transactionId: 1,
      expenseId: 2,
      transactionAmount: 25,
    },
    {
      transactionId: 2,
      expenseId: 2,
      transactionAmount: 15,
    },
    {
      transactionId: 3,
      expenseId: 2,
      transactionAmount: 10,
    },
  ]

  function getExpensesTransactionsTotal(expenseId, transactionsList) {
    let total = 0
    transactionsList.forEach((transaction) => {
      if (transaction.expenseId == expenseId) {
        total += transaction.transactionAmount
      }
    })
    return total
  }
  const [adding, setAdding] = useState(false)

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
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)' }}>
        {expenses.data?.map((expense, i) => {
          //console.log(expense)
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
