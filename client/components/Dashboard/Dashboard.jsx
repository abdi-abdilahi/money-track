import React, { useEffect } from 'react'
import ExpensesPieChart from './ExpensesPieChart'
import TransactionsBarChart from './TransactionsBarChart'
import RecentTransactions from './RecentTransactions'
import { useDispatch } from 'react-redux'
import SavingsList from './Savings/SavingsList'
import { fetchExpenses } from '../../actions/expenses'

function Dashboard() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchExpenses(1))
  }, [])

  return (
    <div>
      <SavingsList />
      <ExpensesPieChart />
      <TransactionsBarChart />
      <RecentTransactions />
    </div>
  )
}

export default Dashboard
