import React, { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { patchExpense, delExpense } from '../../../actions/expenses'
import { Box, Paper, Typography, LinearProgress } from '@mui/material'
import SimpleMenu from '../../SimpleMenu'
import ExpensesForm from './ExpensesForm'
import { currencyFormat } from '../../../utils/currencyFormat'
import { CompressOutlined } from '@mui/icons-material'

export default function ExpensesCard({ expense }) {
  const budget = useSelector((state) => state.budget)
  const transactions = useSelector((state) => state.transactions)
  // const { data: budgetData } = useSelector(state => state.budget)
  // const { data: transactionsData } = useSelector(state => state.transactions)
  //const [transactionsTotal, setTransactionsTotal] = useState(0)
  //const [progress, setProgress] = useState(0)
  console.log('budget:', budget)
  console.log('transactions:', transactions)
  console.log('expense.id:', expense.id)

  const [update, setUpdate] = useState(false)

  const data = transactions.data || []
  // useEffect(() => {
  //   console.log('Updating transactionsTotal and progress')
  //   console.log('transactions:', transactions)
  //   console.log('expense.id:', expense.id)
  //   console.log('budget:', budget)
  //   const total = sumOfDataAmount(
  //     transactions.data,
  //     expense.id,
  //     budget?.data || []
  //   )
  //   console.log('total:', total)
  //   const percentage = Math.round((total / expense.amount) * 100)
  //   console.log('percentage:', percentage)
  //   setTransactionsTotal(total)
  //   setProgress(percentage <= 100 ? percentage : 100)
  // }, [data, expense.id, budget])

  // useEffect(() => {
  //   console.log(
  //     'Calculating transactionsTotal and progress',
  //     transactionsTotal,
  //     progress
  //   )
  //   const total = sumOfDataAmount(
  //     transactions.data,
  //     expense.id,
  //     budget?.data || []
  //   )
  //   const percentage = Math.round((total / expense.amount) * 100)
  //   setTransactionsTotal(total)
  //   setProgress(percentage <= 100 ? percentage : 100)
  // }, [transactions.data, expense.id, budget])
  //Use useMemo to avoid recalculating transactionsTotal on every render
  const transactionsTotal = useMemo(() => {
    return sumOfDataAmount(transactions.data, expense.id, budget?.data || [])
  }, [data, expense.id, budget])
  console.log('Calculating transactionsTotal', transactionsTotal)

  const progress = useMemo(() => {
    const percentage = Math.round((transactionsTotal / expense.amount) * 100)
    return percentage <= 100 ? percentage : 100
  }, [transactionsTotal, expense.amount])
  console.log('Calculating progress', progress)
  console.log('expense.amount:', expense.amount)

  return (
    <Paper
      elevation={2}
      sx={{
        width: 300,
        height: 125,
        margin: 2,
        padding: 2,
        borderRadius: 5,
        background: '#FFFFFF',
      }}
    >
      <Box className="card-container">
        <Box
          className="card-header"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography
            variant="p"
            sx={{ fontSize: 24, fontWeight: 700, color: '#0F3D3E' }}
          >
            {expense.name}
          </Typography>
          <SimpleMenu
            dataId={expense.id}
            setUpdate={setUpdate}
            thunk={delExpense}
          />
        </Box>
        <Box
          className="card-boddy"
          sx={{ display: 'flex', justifyContent: 'space-between', height: 40 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography
              variant="p"
              sx={{ fontSize: 16, fontWeight: 700, color: '#0F3D3E' }}
            >
              {currencyFormat(expense.amount)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Typography
              variant="p"
              sx={{ fontSize: 16, fontWeight: 300, color: '#0F3D3E' }}
            >{`Avaliable: ${currencyFormat(
              expense.amount - transactionsTotal
            )}`}</Typography>
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

function sumOfDataAmount(data, expenseId, [budget]) {
  if (budget) {
    return data
      ?.filter((item) => {
        return (
          budget.startDate < item.dateCreated &&
          item.dateCreated < budget.endDate &&
          item.expensesId == expenseId
        )
      })
      .reduce((total, item) => {
        return total + Number(item.amount)
      }, 0)
  }
}
// function sumOfDataAmount(data, expenseId, [budget]) {
//   if (budget) {
//     return data
//       ?.filter(({ dateCreated, expensesId }) => {
//         // destructure here
//         return (
//           budget.startDate < dateCreated &&
//           dateCreated < budget.endDate &&
//           expensesId == expenseId
//         )
//       })
//       .reduce((total, { amount }) => total + Number(amount), 0) // destructure here
//   }
//   return 0
// }
