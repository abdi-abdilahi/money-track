import React from 'react'
import ExpensesPieChart from './ExpensesPieChart'
import TransactionsBarChart from './TransactionsBarChart'

function Dashboard() {
  return (
    <div>
      <ExpensesPieChart />
      <TransactionsBarChart />
    </div>
  )
}

export default Dashboard
