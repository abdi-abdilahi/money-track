import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import ExpenseStatus from './ExpenseStatus'
import ExpenseMenu from './ExpenseMenu'
export default function ExpenseCard({ expense }) {
  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <ExpenseMenu expense={expense} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {expense.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {expense.amount}
          </Typography>
        </CardContent>

        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <ExpenseStatus />
        </Box>
      </Box>
      <CardMedia />
    </Card>
  )
}
