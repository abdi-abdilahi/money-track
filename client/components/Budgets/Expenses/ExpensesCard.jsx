import React, { useState } from 'react'
import { patchExpense } from '../../../actions/expenses'
import { Box, Card, CardContent, Typography } from '@mui/material'
import ExpensesStatus from './ExpensesStatus'
import SimpleMenu from '../../SimpleMenu'
import ExpensesForm from './ExpensesForm'

export default function ExpenseCard({ expense }) {
  const [update, setUpdate] = useState(false)

  return (
    <>
      <Box>
        <Card
          sx={{
            display: 'flex',
            m: 2,
            p: 2,
            width: 400,
            borderRadius: 10,
          }}
        >
          <Box
            className="contianer"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: 400,
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
                <Typography component="div" variant="h5" color="text.primary">
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
              <Box>
                <Typography>Avaliable: $00</Typography>
              </Box>

              <Box
                className="bottom"
                sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
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
