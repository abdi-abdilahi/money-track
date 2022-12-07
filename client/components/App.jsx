import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Layout from './Layout'
import Dashboard from './Dashboard/Dashboard'
import TransactionsList from './Transactions/TransactionsList'
import NotFound from './NotFound'
import Budgets from './Budgets/Budgets'

export default function App() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect()
    }
  }, [isAuthenticated, isLoading])

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
        <div
          style={{
            width: '100vw',
            height: '100vh',
            background:
              'linear-gradient(172deg, rgba(16,15,15,1) 32%, rgba(15,61,62,1) 93%)',
          }}
        ></div>
      )}
    </>
  )
}
