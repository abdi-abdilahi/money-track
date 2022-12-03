import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

import { useDispatch } from 'react-redux'
import { postExpenses } from '../actions/expenses'
const formData = { name: '', amount: '' }
export default function AddExpense({ form, setForm }) {
  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(postExpenses(1, form), e)
    setForm(formData)
  }

  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onSubmit={handleSubmit}>
          Add
        </Button>
      </Stack>
    </div>
  )
}
