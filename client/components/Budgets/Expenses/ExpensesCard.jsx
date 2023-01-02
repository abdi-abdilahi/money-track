import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { patchExpense, delExpense } from '../../../actions/expenses'
import { Box, Paper, Typography, LinearProgress } from '@mui/material'
import SimpleMenu from '../../SimpleMenu'
import ExpensesForm from './ExpensesForm'
import { currencyFormat } from '../../../utils/currencyFormat'

export default function ExpensesCard({ expense }) {
  const budget = useSelector((state) => state.budget)
  const transactions = useSelector((state) => state.transactions)
  // const { data: budgetData } = useSelector(state => state.budget)
  // const { data: transactionsData } = useSelector(state => state.transactions)
  const [transactionsTotal, setTransactionsTotal] = useState(0)
  const [progress, setProgress] = useState(0)
  console.log('budget:', budget)
  console.log('transactions:', transactions)
  console.log('expense.id:', expense.id)

  const [update, setUpdate] = useState(false)

  const data = transactions?.data || []
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
  const previousTransactions = data.slice(0, -1) || []
  // console.log('data:', data)
  // console.log('expense:', expense)
  // console.log('budget:', budget)
  //console.log('previousTransactions:', previousTransactions)
  useEffect(() => {
    console.log(
      'Calculating transactionsTotal and progress',
      transactionsTotal,
      progress
    )
    console.log('transactions:', transactions)
    console.log('budget:', budget)
    console.log('data:', data)
    console.log('expense.id:', expense?.id)

    //const previousTransactions = Object.values(transactions).slice(0, -1)
    const total = sumOfDataAmount(
      data,
      expense?.id,
      budget?.data || [],
      previousTransactions
    )

    // const total = sumOfDataAmount(data, expense.id, budget?.data || [])
    const percentage = Math.round((total / expense?.amount) * 100)
    setTransactionsTotal(total)
    setProgress(percentage <= 100 ? percentage : 100)
  }, [data, expense?.id, budget, transactions])
  // console.log('expense:', expense)
  // console.log('expense.parentObject:', expense.parentObject)
  // console.log('expense.amount:', expense.amount)
  // console.log('expense.parentObject.amount:', expense?.parentObject?.amount)

  //Use useMemo to avoid recalculating transactionsTotal on every render
  // const transactionsTotal = useMemo(() => {
  //   return sumOfDataAmount(data, expense.id, budget?.data || [])
  // }, [data, expense.id, budget])
  // console.log('Calculating transactionsTotal', transactionsTotal)

  // const progress = useMemo(() => {
  //   const percentage = Math.round((transactionsTotal / expense.amount) * 100)
  //   return percentage <= 100 ? percentage : 100
  // }, [transactionsTotal, expense.amount])
  // console.log('Calculating progress', progress)
  // console.log('expense.amount:', expense.amount)

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

// function sumOfDataAmount(data, expense, [budget]) {
//   console.log('data:', data)
//   console.log('expenseId:', expense)
//   console.log('budget:', budget)

//   if (budget) {
//     return data
//       ?.filter((item) => {
//         return (
//           budget.startDate < item.dateCreated &&
//           item.dateCreated < budget.endDate &&
//           item.expensesId == expense.id
//         )
//       })

//       .reduce((total, item) => {
//         console.log('total:', total)
//         return total + Number(item.amount)
//       }, 0)
//   }
// }

// function sumOfDataAmount(data, expenseId, budget) {
//   console.log('data:', data)
//   console.log('expenseId:', expenseId)
//   console.log('budget:', budget)

//   if (budget) {
//     const filteredData = data?.filter((item) => {
//       return (
//         budget.startDate < item.dateCreated &&
//         item.dateCreated < budget.endDate &&
//         item.expensesId == expenseId
//       )
//     })
//     console.log('filteredData:', filteredData)
//     return filteredData.reduce((total, item) => {
//       console.log('calculating total:', total)
//       return total + Number(item.amount)
//     }, 0)
//   }
// }
// function sumOfDataAmount(data, expenseId, budget) {
//   console.log('data:', data)
//   console.log('expenseId:', expenseId)
//   console.log('budget:', budget)

//   if (budget) {
//     const filteredData = data?.filter((item) => {
//       console.log('processing item:', item)
//       console.log('budget start date:', budget.startDate)
//       console.log('budget end date:', budget.endDate)
//       console.log('expenseId:', expenseId)
//       return (
//         budget.startDate < item.dateCreated &&
//         item.dateCreated < budget.endDate &&
//         item.expensesId === expenseId
//       )
//     })
//     console.log('filteredData:', filteredData)
//     return filteredData.reduce((total, item) => {
//       console.log('calculating total:', total)
//       return total + Number(item.amount)
//     }, 0)
//   }
// }
// function sumOfDataAmount(data, expenseId, budget) {
//   console.log('data:', data)
//   console.log('expenseId:', expenseId)
//   console.log('budget:', budget)

//   if (budget && budget.data.length > 0 && data && data.length > 0) {
//     const startDate = budget.data[0].startDate
//     const endDate = budget.data[0].endDate
//     const filteredData = data.filter((item) => {
//       console.log('processing item:', item)
//       console.log('budget start date:', startDate)
//       console.log('budget end date:', endDate)
//       console.log('expenseId:', expenseId)
//       return (
//         startDate < item.dateCreated &&
//         item.dateCreated < endDate &&
//         item.expensesId == expenseId
//       )
//     })
//     console.log('filteredData:', filteredData)
//     const total = filteredData.reduce((total, item) => {
//       console.log('calculating total:', total)
//       return total + Number(item.amount)
//     }, 0)
//     console.log('total:', total)
//     return total
//   }
// }
// function sumOfDataAmount(data, expenseId, budgetData, previousTransactions) {
//   console.log('data:', data)
//   console.log('expenseId:', expenseId)
//   console.log('budgetData:', budgetData)
//   console.log('previousTransactions:', previousTransactions)

//   let total = 0
//   const budgetIds = budgetData.map((budget) => budget.id)
//   console.log('budgetIds:', budgetIds)
//   const transactionIds = data.map((transaction) => transaction.id)
//   console.log('transactionIds:', transactionIds)
//   const previousTransactionIds = previousTransactions.map(
//     (transaction) => transaction.id
//   )
//   console.log('previousTransactionIds:', previousTransactionIds)
//   data = data.filter((transaction) => transaction.expenseId === expenseId)
//   data.forEach((transaction) => {
//     console.log('expenseId:', expenseId)
//     console.log('transaction.id:', transaction.id)
//     console.log('transaction.parentTransaction:', transaction.parentTransaction)
//     if (
//       transaction.expenseId === expenseId &&
//       !budgetIds.includes(transaction.id) &&
//       !transactionIds.includes(transaction.id) &&
//       !previousTransactionIds.includes(transaction.id)
//     ) {
//       total += transaction.amount
//     }
//   })
//   console.log('calculating total:', total)
//   return total
// }

// function sumOfDataAmount(data, expenseId, budgetData, previousTransactions) {
//   console.log('data:', data)
//   console.log('expenseId:', expenseId)
//   console.log('budgetData:', budgetData)
//   console.log('previousTransactions:', previousTransactions)

//   let total = 0
//   const budgetIds = budgetData.map((budget) => budget.id)
//   console.log('budgetIds:', budgetIds)
//   const transactionIds = data.map((transaction) => transaction.id)
//   console.log('transactionIds:', transactionIds)
//   const previousTransactionIds = previousTransactions.map(
//     (transaction) => transaction.id
//   )
//   console.log('previousTransactionIds:', previousTransactionIds)

//   data.forEach((transaction) => {
//     console.log('expenseId:', expenseId)
//     console.log('transaction.id:', transaction.id)
//     console.log('transaction.parentTransaction:', transaction.parentTransaction)
//     if (
//       (transaction.expenseId === data.expenseId ||
//         (transaction.expenseId === undefined &&
//           transaction.parentTransaction === undefined)) &&
//       !budgetIds.includes(transaction.id) &&
//       !transactionIds.includes(transaction.parentTransaction) &&
//       !previousTransactionIds.includes(transaction.parentTransaction)
//     ) {
//       total += transaction.amount
//     }
//   })
//   console.log('calculating total:', total)
//   return total
// }

function sumOfDataAmount(data, expenseId, budgetData, previousTransactions) {
  let total = 0
  const budgetIds = budgetData.map((budget) => budget.id)
  const transactionIds = data.map((transaction) => transaction.id)
  const previousTransactionIds = previousTransactions.map(
    (transaction) => transaction.id
  )

  const processedExpenseIds = new Set() // set to store the processed expense IDs

  data.forEach((transaction) => {
    if (processedExpenseIds.has(transaction.expenseId)) {
      // if the expense ID has already been processed, skip this transaction
      return
    }

    // check if the transaction matches the given expense ID or if it has no expense ID and no parent transaction
    if (
      (transaction.expenseId === expenseId ||
        (transaction.expenseId === undefined &&
          transaction.parentTransaction === undefined)) &&
      !budgetIds.includes(transaction.id) &&
      !transactionIds.includes(transaction.parentTransaction) &&
      !previousTransactionIds.includes(transaction.parentTransaction)
    ) {
      total += transaction.amount
    }

    // mark the expense ID as processed
    processedExpenseIds.add(transaction.expenseId)
  })

  return total
}
