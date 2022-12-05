import React, { useState } from 'react'
import { patchExpense } from '../../../actions/expenses'
import { Box, Card, CardContent, Typography } from '@mui/material'
import ExpensesStatus from './ExpensesStatus'
import SimpleMenu from '../../SimpleMenu'
import ExpensesForm from './ExpensesForm'

export default function ExpenseCard({ expense, transactionsTotal }) {
  const [update, setUpdate] = useState(false)

  return (
    <>
      <Box>
        <Card
          sx={{
            display: 'flex',
            m: 1,
            width: 165,
            height: 175,
            borderRadius: 6,
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
                <Typography>
                  Avaliable: ${expense.amount - transactionsTotal}
                </Typography>
              </Box>

              <Box
                className="bottom"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <ExpensesStatus />
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
