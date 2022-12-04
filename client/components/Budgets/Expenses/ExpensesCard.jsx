import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import ExpenseStatus from './ExpenseStatus'
import SimpleMenu from './SimpleMenu'
import EditBtnForm from './EditBtnForm'

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
                <SimpleMenu expense={expense} setUpdate={setUpdate} />
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
                <ExpenseStatus />
              </Box>
            </CardContent>
          </Box>
        </Card>
        {update ? (
          <EditBtnForm expense={expense} setUpdate={setUpdate} />
        ) : null}
      </Box>
    </>
  )
}
