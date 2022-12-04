import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postExpenses } from '../../../actions/expenses'

const formData = { name: '', amount: '', budget_id: 1 }

export default function ExpenseForm() {
  const [form, setForm] = useState(formData)
  const dispatch = useDispatch()

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        dispatch(postExpenses(1, form), e)
        setForm(formData)
      }}
    >
      <input
        name="name"
        type="text"
        placeholder="Expense Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="amount"
        type="text"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
      />

      <button type="submit">Add</button>
    </form>
  )
}
