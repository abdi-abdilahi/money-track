import React, { useEffect } from 'react'
import ExpensesPieChart from './ExpensesPieChart'
import TransactionsBarChart from './TransactionsBarChart'
import RecentTransactions from './RecentTransactions'
import { useDispatch } from 'react-redux'
import SavingsList from './Savings/SavingsList'
import { fetchExpenses } from '../../actions/expenses'
import { fetchBudget } from '../../actions/budget'
import { useAuth0 } from '@auth0/auth0-react'

function Dashboard() {
  const dispatch = useDispatch()
  const { getAccessTokenSilently } = useAuth0()
  useEffect(async () => {
    const token = await getAccessTokenSilently()
    dispatch(fetchBudget(token))
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
