import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SavingsList from './Savings/SavingsList'
import { fetchExpenses } from '../../actions/expenses'

function Dashboard() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchExpenses(1))
  }, [])
  return (
    <>
      <div>Dashboard</div>
      <SavingsList />
    </>
  )
}

export default Dashboard
