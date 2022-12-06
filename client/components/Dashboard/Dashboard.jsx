import React from 'react'
import ExpensesPieChart from './ExpensesPieChart'
import TransactionsBarChart from './TransactionsBarChart'
import RecentTransactions from './RecentTransactions'

function Dashboard() {
  return (
    <div>
      <ExpensesPieChart />
      <TransactionsBarChart />
      <RecentTransactions />
    </div>
  )
}

export default Dashboard
