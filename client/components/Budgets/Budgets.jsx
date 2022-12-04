import React from 'react'

import IncomesInfo from './Incomes/IncomesInfo'
import ExpensesList from './Expenses/ExpensesList'

export default function Budgets() {
  return (
    <div>
      <h2>Expenses</h2>
      <IncomesInfo />
      <ExpensesList />
    </div>
  )
}
