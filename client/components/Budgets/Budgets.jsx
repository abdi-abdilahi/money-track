import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchExpenses } from '../../actions/expenses'
import { fetchIncomes } from '../../actions/incomes'
import IncomesInfo from './Incomes/IncomesInfo'
import ExpensesList from './Expenses/ExpensesList'

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
    <div>
      <h2>Expenses</h2>
      <IncomesInfo incomes={incomes} expenses={expenses} />
      <ExpensesList />
    </div>
  )
}
