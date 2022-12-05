import React, { useState, useEffect } from 'react'
import { patchExpense } from '../../../actions/expenses'
import { Box, Card, CardContent, Typography } from '@mui/material'
import ExpensesStatus from './ExpensesStatus'
import SimpleMenu from '../../SimpleMenu'
import ExpensesForm from './ExpensesForm'
import { useSelector } from 'react-redux'

export default function ExpenseCard({ expense }) {
  const [update, setUpdate] = useState(false)
  const transactions = useSelector((state) => state.transactions)
  const [progress, setProgress] = useState(0)
  const [totalT, setTotalT] = useState(0)

  const data = transactions.data || []

  useEffect(() => {
    const total = sumOfDataAmount(data, expense.id)
    setTotalT(total)
    const perct = Math.round((total / expense.amount) * 100)
    setProgress(perct <= 100 ? perct : 100)
  }, [data])

  function sumOfDataAmount(data, expenseId) {
    return data
      ?.filter((item) => item.expensesId == expenseId)
      .reduce((total, item) => {
        return total + Number(item.amount)
      }, 0)
  }

  return (
    <>
      <Box>
        <Card
          sx={{
            display: 'flex',

            m: 1,
            width: 165,
            height: 175,
            borderRadius: 4,
            justifyContent: 'center',
          }}
        >
          <Box
            className="contianer"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: 175,
            }}
          >
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Box
                className="top"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography component="div" variant="h6" color="text.primary">
                  {expense.name}
                </Typography>
                <SimpleMenu dataId={expense.id} setUpdate={setUpdate} />
              </Box>
              <Box className="middle">
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  ${expense.amount}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                <Typography>Avaliable: ${expense.amount - totalT}</Typography>
              </Box>

              <Box
                className="bottom"
                sx={{
                  display: 'flex',
                }}
              >
                <ExpensesStatus progress={progress} />
              </Box>
            </CardContent>
          </Box>
        </Card>

        {update ? (
          <ExpensesForm
            title={'Edit Expense '}
            thunk={patchExpense}
            expensesData={expense}
            setStatus={setUpdate}
            firstParam={expense.id}
          />
        ) : null}
      </Box>
    </>
  )
}
