import React, { useState } from 'react'
import Incomes from './Incomes'
import IncomesForm from './IncomesForm'
import EditIcon from '@mui/icons-material/Edit'
import { currencyFormat } from '../../../utils/currencyFormat'
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
    <Box>
      <Box
        className="incomes-info"
        sx={{
          display: 'flex',
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
          <Typography
            variant="p"
            sx={{ color: '#0F3D3E', fontSize: 24, fontWeight: 500 }}
          >{`${
            currencyFormat(
              sumOfDataAmount(incomes) - sumOfDataAmount(expenses)
            ) || '$0.00'
          }`}</Typography>
          <Typography
            variant="p"
            sx={{ color: '#0F3D3E', fontSize: 16, fontWeight: 300 }}
          >
            DISPOSABLE INCOME
          </Typography>
        </Box>

        <Button
          color="primary"
          variant="outlined"
          size="medium"
          startIcon={<EditIcon />}
          onClick={() => setAdding(true)}
          sx={{ color: '#0F3D3E', marginLeft: 2 }}
        >
          Edit Income
        </Button>
      </Box>

      {adding ? (
        <Dialog open={true} onClose={handleClose} scroll="paper">
          <DialogTitle sx={{ color: '#0F3D3E', fontWeight: 500, fontSize: 24 }}>
            Edit Income
          </DialogTitle>
          <DialogContent dividers={true}>
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
    </Box>
  )
}

function sumOfDataAmount(data) {
  return data.data?.reduce((total, item) => total + Number(item.amount), 0)
}
