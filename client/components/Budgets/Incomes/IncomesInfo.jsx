import React, { useState } from 'react'
import Incomes from './Incomes'
import IncomesForm from './IncomesForm'
import EditIcon from '@mui/icons-material/Edit'
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material'

export default function IncomesInfo({ incomes, expenses }) {
  const [adding, setAdding] = useState(false)

  function handleClose() {
    setAdding(false)
  }

  return (
    <div>
      <div>{incomes.loading && <p>Loading.....</p>}</div>
      <div>{incomes.error && <p>Something went wrong!</p>}</div>

      <Box
        className="incomes-info"
        sx={{
          display: 'flex',
          width: 350,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" sx={{ color: '#0F3D3E' }}>{`$${
            sumOfDataAmount(incomes) - sumOfDataAmount(expenses) || '0.00'
          }`}</Typography>
          <Typography variant="p" sx={{ color: '#0F3D3E' }}>
            DISPOSABLE INCOME
          </Typography>
        </Box>

        <Button
          variant="outlined"
          size="medium"
          startIcon={<EditIcon />}
          onClick={() => setAdding(true)}
        >
          Edit Income
        </Button>
      </Box>

      {adding ? (
        <Dialog open="true" onClose={handleClose} scroll="paper">
          <DialogTitle sx={{ color: '#3277d5', fontStyle: 'bold' }}>
            Edit Income
          </DialogTitle>
          <DialogContent dividers="true">
            {incomes.data?.map((income, i) => (
              <Incomes key={i} income={income} />
            ))}

            <IncomesForm
              handleClose={handleClose}
              total={sumOfDataAmount(incomes)}
            />
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  )
}

function sumOfDataAmount(data) {
  return data.data?.reduce((total, item) => total + Number(item.amount), 0)
}
