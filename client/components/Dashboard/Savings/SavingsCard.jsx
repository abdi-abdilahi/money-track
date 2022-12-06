import React, { useState } from 'react'
import { Box, Paper, Typography, LinearProgress } from '@mui/material'
import SimpleMenu from '../../SimpleMenu'
import SavingsForm from './SavingsForm'
import { delSavings } from '../../../actions/savings'

function SavingsCard({ saving }) {
  const [update, setUpdate] = useState(false)
  //const [progress, setProgress] = useState(50)

  return (
    <Paper
      sx={{
        width: 325,
        height: 175,
        margin: 4,
        padding: 2,
        borderRadius: 5,
      }}
    >
      <Box className="card-container">
        <Box
          className="card-header"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography variant="h4">{saving.name}</Typography>
          <SimpleMenu
            thunk={delSavings}
            dataId={saving.id}
            setUpdate={setUpdate}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Typography variant="h6">
            {new Date(saving.goalDate).toDateString()}
          </Typography>
        </Box>
        <Box
          className="card-body"
          sx={{ display: 'flex', justifyContent: 'space-between', height: 60 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="h6">${saving.amount}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Typography variant="h6">{`Current: $${
              saving.amount - 100
            }`}</Typography>
          </Box>
        </Box>
        <Box>
          <LinearProgress
            color="primary"
            value={45}
            variant="determinate"
            sx={{ height: 8, borderRadius: 15 }}
          />
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
