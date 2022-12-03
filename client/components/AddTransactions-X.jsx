import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postTransaction } from '../actions/transactions'

const AddTransactions = () => {
  const categoryNames = useSelector((state) => state.transactions) // use state.expenses
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
    console.log('m new Transaction Data', newTransaction)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="transaction">Add Transaction: </label>
      <select name="expensesId" onChange={handleChange}>
        {categoryNames.data?.map((category, i) => {
          return (
            <option key={i} value={category.expensesId}>
              {category.expensesName}
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
  )
}

export default AddTransactions
