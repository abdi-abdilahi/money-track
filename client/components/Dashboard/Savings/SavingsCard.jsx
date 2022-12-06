import React, { useState } from 'react'
import { patchSavings } from '../../../actions/savings'
import { Box, Paper, Typography, LinearProgress } from '@mui/material'
import SimpleMenu from '../../SimpleMenu'
import SavingsForm from './SavingsForm'

function SavingsCard({ saving }) {
  console.log('saving parameter passed in Saving card is ', saving)
  const [update, setUpdate] = useState(false)
  //const [progress, setProgress] = useState(50)

  return (
    <Paper
      sx={{
        width: 425,
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
          <SimpleMenu dataId={saving.id} setUpdate={setUpdate} />
        </Box>
        <Box
          className="card-boddy"
          sx={{ display: 'flex', justifyContent: 'space-between', height: 60 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="h6">{saving.amount}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="h6">{saving.goal_date}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="h6">{saving.date}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Typography variant="h6">Current Amount: $00</Typography>
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
          title={'Edit Saving '}
          thunk={patchSavings}
          savingsData={saving}
          setStatus={setUpdate}
          firstParam={saving.id}
        />
      ) : null}
    </Paper>
  )
}

export default SavingsCard
