import React, { useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import SimpleMenu from '../../SimpleMenu'
import SavingsForm from './SavingsForm'
import { delSavings } from '../../../actions/savings'
import { currencyFormat } from '../../../utils/currencyFormat'

function SavingsCard({ saving }) {
  const [update, setUpdate] = useState(false)

  return (
    <Paper
      elevation={3}
      sx={{
        width: 250,
        height: 110,
        margin: 2,
        padding: 1,
        borderRadius: 5,
        background: '#FFFFFF',
      }}
    >
      <Box className="paper-container">
        <Box
          className="paper-header"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography
            variant="p"
            sx={{ fontSize: 24, fontWeight: 700, color: '#0F3D3E' }}
          >
            {saving.name}
          </Typography>
          <SimpleMenu
            thunk={delSavings}
            dataId={saving.id}
            setUpdate={setUpdate}
          />
        </Box>

        <Box
          className="paper-body"
          sx={{ display: 'flex', justifyContent: 'space-between', height: 30 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography
              variant="p"
              sx={{ fontSize: 16, fontWeight: 700, color: '#0F3D3E' }}
            >
              {currencyFormat(saving.amount)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Typography sx={{ fontSize: 16, fontWeight: 300, color: '#0F3D3E' }}>
            {`Goal Date: ${new Date(saving.goalDate).toDateString()}`}
          </Typography>
        </Box>
      </Box>

      {update ? (
        <SavingsForm
          title={'Edit Saving'}
          savingsData={saving}
          setStatus={setUpdate}
        />
      ) : null}
    </Paper>
  )
}

export default SavingsCard
