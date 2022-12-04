import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postTransaction } from '../../actions/transactions'

export default function TransactionForm({ expenses }) {
  const [data, setData] = useState([])
  const dispatch = useDispatch()

  function handleChange(e) {
    const { name, value } = e.target
    e.preventDefault()
    setData({ ...data, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const newTransaction = {
      name: data.name,
      amount: data.amount,
      date_created: data.dateCreated,
      expenses_id: data.expensesId,
    }
    dispatch(postTransaction(newTransaction))
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="transaction">Add Transaction: </label>
        <select name="expensesId" onChange={handleChange}>
          {expenses.data?.map((expense, i) => {
            return (
              <option key={i} value={expense.id}>
                {expense.name}
              </option>
            )
          })}
        </select>
        <input
          type="text"
          name="name"
          value={data.name || ''}
          placeholder="enter a name for the transaction"
          onChange={handleChange}
        />
        <input
          type="text"
          name="amount"
          value={data.amount || ''}
          placeholder="enter an amount"
          onChange={handleChange}
        />
        <input
          name="dateCreated"
          value={data.dateCreated || ''}
          type="date"
          onChange={handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}
