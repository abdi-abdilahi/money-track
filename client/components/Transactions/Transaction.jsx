import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { delTransaction, patchTransaction } from '../../actions/transactions'

export default function Transaction({ transaction, expenses }) {
  const dispatch = useDispatch()
  const [updating, setUpdating] = useState(false)

  function handleDelete(event) {
    event.preventDefault()
    dispatch(delTransaction(Number(event.target.value)))
  }

  function handleEdit(event) {
    event.preventDefault()
    setUpdating(true)
  }

  return updating ? (
    <Form
      transaction={transaction}
      setUpdating={setUpdating}
      expenses={expenses}
    />
  ) : (
    <>
      <li key={transaction.id}>
        Name: {transaction.name}, Expense Type:{transaction.expensesName}{' '}
        ,Amount: {transaction.amount}, Date:
        {new Date(transaction.dateCreated).toDateString()}
        <button onClick={handleDelete} value={transaction.id}>
          Delete
        </button>
        <button onClick={handleEdit} value={transaction.id}>
          Edit
        </button>
      </li>
    </>
  )
}

function Form({ transaction, setUpdating, expenses }) {
  const [data, setData] = useState(transaction)
  const dispatch = useDispatch()

  function handleChange(e) {
    const { name, value } = e.target
    e.preventDefault()
    setData({ ...data, [name]: value })
  }

  function handleUpdate(e) {
    e.preventDefault()

    const updatedTransaction = {
      name: data.name,
      amount: data.amount,
      date_created: data.dateCreated,
      expenses_id: data.expensesId,
    }

    dispatch(patchTransaction(transaction.id, updatedTransaction))
    setUpdating(false)
  }

  function handleChangeCategory(event) {
    const { expensesName } = expenses.data.find((expense) => {
      if (expense.id === Number(event.target.value)) {
        return expense.name
      }
    })
    setData({
      ...data,
      expensesId: event.target.value,
      expensesName: expensesName,
    })
  }

  return (
    <form onSubmit={handleUpdate}>
      <select name="transaction" onChange={handleChangeCategory}>
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
        value={data.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="amount"
        value={data.amount}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dateCreated"
        value={data.dateCreated}
        onChange={handleChange}
      />
      <button type="submit">Update</button>
    </form>
  )
}
