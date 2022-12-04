import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './Layout'
import Dashboard from './Dashboard/Dashboard'
import TransactionsList from './Transactions/TransactionsList'
import NotFound from './NotFound'
import Budgets from './Budgets/Budgets'

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionsList />} />
          <Route path="/expenses/:budgetId" element={<Budgets />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}
