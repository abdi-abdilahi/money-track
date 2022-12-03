import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchExpenses } from '../actions/expenses'
import Button from '@mui/material/Button'
import AddBtnForm from './AddBtnForm'
import ExpenseCard from './ExpensesCard'

export default function ExpensesList() {
  const expenses = useSelector((state) => state.expenses)
  const [adding, setAdding] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchExpenses(1))
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
      {adding ? (
        <AddBtnForm setAdding={setAdding} />
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            setAdding(true)
          }}
        >
          Add
        </Button>
      )}
    </div>
  )
}
