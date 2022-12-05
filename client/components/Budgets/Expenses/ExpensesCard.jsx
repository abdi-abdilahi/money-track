import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { patchExpense } from '../../../actions/expenses'
import { Box, Paper, Typography, LinearProgress } from '@mui/material'
import SimpleMenu from '../../SimpleMenu'
import ExpensesForm from './ExpensesForm'

export default function ExpensesCard({ expense }) {
  const transactions = useSelector((state) => state.transactions)
  const [transactionsTotal, setTransactionsTotal] = useState(0)
  const [progress, setProgress] = useState(0)
  const [update, setUpdate] = useState(false)

  const data = transactions.data || []

  useEffect(() => {
    const total = sumOfDataAmount(data, expense.id)
    const percentage = Math.round((total / expense.amount) * 100)
    setTransactionsTotal(total)
    setProgress(percentage <= 100 ? percentage : 100)
  }, [data])

  return (
    <Paper
      sx={{
        width: 400,
        height: 150,
        margin: 4,
        padding: 2,
        borderRadius: 5,
      }}
    >
      <Box className="card-container">
        <Box
          className="card-header"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography variant="h4">{expense.name}</Typography>
          <SimpleMenu dataId={expense.id} setUpdate={setUpdate} />
        </Box>
        <Box
          className="card-boddy"
          sx={{ display: 'flex', justifyContent: 'space-between', height: 60 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="h6">${expense.amount}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Typography variant="h6">{`Avaliable: $${
              expense.amount - transactionsTotal
            }`}</Typography>
          </Box>
        </Box>
        <Box>
          <LinearProgress
            color="primary"
            value={progress}
            variant="determinate"
            sx={{ height: 8, borderRadius: 15 }}
          />
        </Box>
      </Box>

      {update ? (
        <ExpensesForm
          title={'Edit Expense '}
          thunk={patchExpense}
          expensesData={expense}
          setStatus={setUpdate}
          firstParam={expense.id}
        />
      ) : null}
    </Paper>
  )
}

function sumOfDataAmount(data, expenseId) {
  return data
    ?.filter((item) => item.expensesId == expenseId)
    .reduce((total, item) => {
      return total + Number(item.amount)
    }, 0)
}
