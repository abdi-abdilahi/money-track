import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
<<<<<<< HEAD:client/components/Budgets/Expenses/ExpensesList.jsx
import { useParams } from 'react-router-dom'
import { fetchExpenses } from '../../../actions/expenses'
=======
import { fetchExpenses } from '../actions/expenses'
import AddExpense from './AddExpense'
>>>>>>> c796929 (refactor form code and add btn code):client/components/ExpensesList.jsx

import ExpenseCard from './ExpensesCard'

export default function ExpensesList() {
  const { budgetId } = useParams()
  const expenses = useSelector((state) => state.expenses)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchExpenses(budgetId))
  }, [])

  return (
    <div>
      {expenses.loading && <p>Loading....</p>}
      {expenses.error && <p>expenses.error</p>}

      <ul>
        {expenses.data?.map((expense, i) => {
          return <ExpenseCard key={i} expense={expense} />
        })}
      </ul>

      <AddExpense />
    </div>
  )
}
