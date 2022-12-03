import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchExpenses } from '../../../actions/expenses'

import ExpenseForm from './ExpenseForm'
import ExpenseCard from './ExpensesCard'
import Form from './Form'

export default function ExpensesList() {
  const { budgetId } = useParams()
  const expenses = useSelector((state) => state.expenses)
  const [update, setUpdate] = useState(false)
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
          return <ExpenseCard key={i} expense={expense} setUpdate={setUpdate} />
        })}
      </ul>

      {update ? <p>update text</p> : <ExpenseForm />}
    </div>
  )
}
