import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTransactions } from '../actions/transactions'

import Transaction from './Transaction'
import AddTransactions from './AddTransactions'

const TransactionsList = () => {
  const transactions = useSelector((state) => state.transactions)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [])

  return (
    <div>
      <AddTransactions />
      <div>{transactions.loading && <p>Loading.....</p>}</div>
      <div>{transactions.error && <p>Something went wrong!</p>}</div>
      <ul>
        {transactions.data?.map((transaction, i) => {
          return <Transaction key={i} transaction={transaction} />
        })}
      </ul>
    </div>
  )
}

export default TransactionsList
