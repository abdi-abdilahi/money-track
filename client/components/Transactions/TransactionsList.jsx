import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTransactions } from '../../actions/transactions'
import { fetchExpenses } from '../../actions/expenses'

import Transaction from './Transaction'
import TransactionForm from './TransactionForm'

export default function TransactionsList() {
  const transactions = useSelector((state) => state.transactions)
  const expenses = useSelector((state) => state.expenses)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchExpenses(1))
    dispatch(fetchTransactions())
  }, [])

  return (
    <div>
      <div>
        {transactions.loading && expenses.loading && <p>Loading.....</p>}
      </div>
      <div>
        {transactions.error && expenses.error && <p>Something went wrong!</p>}
      </div>
      {expenses.data && <TransactionForm expenses={expenses} />}

      <ul>
        {transactions.data?.map((transaction, i) => {
          return (
            <Transaction
              key={i}
              transaction={transaction}
              expenses={expenses}
            />
          )
        })}
      </ul>
    </div>
  )
}
