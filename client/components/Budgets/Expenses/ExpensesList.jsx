import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchExpenses } from '../../../actions/expenses'
import Button from '@mui/material/Button'

import AddBtnForm from './AddBtnForm'
import ExpenseCard from './ExpensesCard'
import Box from '@mui/material/Box'
export default function ExpensesList() {
  const expenses = useSelector((state) => state.expenses)
  const [adding, setAdding] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchExpenses(1))
  }, [])

  return (
    <>
      {expenses.loading && <p>Loading....</p>}
      {expenses.error && <p>expenses.error</p>}

      {adding ? (
        <AddBtnForm setAdding={setAdding} />
      ) : (
        <Box
          className="add-btn"
          sx={{ display: 'flex', justifyContent: 'flex-end', m: 1, p: 1 }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setAdding(true)
            }}
          >
            Add New
          </Button>
        </Box>
      )}
      <Box>
        <ul>
          {expenses.data?.map((expense, i) => {
            return <ExpenseCard key={i} expense={expense} />
          })}
        </ul>
      </Box>
    </>
  )
}
