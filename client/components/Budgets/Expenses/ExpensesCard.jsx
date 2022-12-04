import React, { useState } from 'react'
import { delExpense, patchExpense } from '../../../actions/expenses'
import { useDispatch } from 'react-redux'

export default function ExpensesCard({ expense }) {
  const [update, setUpdate] = useState(false)
  const dispatch = useDispatch()

  return update ? (
    <Form expense={expense} setUpdate={setUpdate} />
  ) : (
    <>
      <li>
        {expense.name} {expense.amount}
        <button
          onClick={() => {
            dispatch(delExpense(expense.id))
          }}
        >
          Delete
        </button>
        <button
          onClick={() => {
            setUpdate(true)
          }}
        >
          Edit
        </button>
      </li>
    </>
  )
}

function Form({ expense, setUpdate }) {
  const [data, setData] = useState(expense)
  const dispatch = useDispatch()

  function handleChange(e) {
    e.preventDefault()
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  function handleUpdate(e) {
    e.preventDefault()
    const updatedExpense = {
      name: data.name,
      amount: data.amount,
    }
    dispatch(patchExpense(expense.id, updatedExpense))
    setUpdate(false)
  }

  return (
    <form onSubmit={handleUpdate}>
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
      <button type="submit">Update</button>
    </form>
  )
}
