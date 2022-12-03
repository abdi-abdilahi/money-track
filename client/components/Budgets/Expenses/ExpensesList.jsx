import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchExpenses } from '../../../actions/expenses'

import ExpenseForm from './ExpenseForm'
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

      <ExpenseForm />
    </div>
  )
}
