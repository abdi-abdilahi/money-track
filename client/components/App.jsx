import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Layout from './Layout'
import Dashboard from './Dashboard/Dashboard'
import TransactionsList from './Transactions/TransactionsList'
import NotFound from './NotFound'
import Budgets from './Budgets/Budgets'

export default function App() {
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  const handleSignIn = (e) => {
    e.preventDefault()
    loginWithRedirect()
  }
  return (
    <>
      {isAuthenticated ? (
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/transactions" element={<TransactionsList />} />
            <Route path="/expenses/:budgetId" element={<Budgets />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      ) : (
        <button onClick={handleSignIn}>Log In</button>
      )}
    </>
  )
}
