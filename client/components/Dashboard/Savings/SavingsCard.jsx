import React, { useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import SimpleMenu from '../../SimpleMenu'
import SavingsForm from './SavingsForm'
import { delSavings } from '../../../actions/savings'

function SavingsCard({ saving }) {
  const [update, setUpdate] = useState(false)

  return (
    <Paper
      sx={{
        width: 325,
        height: 175,
        margin: 2,
        padding: 2,
        borderRadius: 5,
      }}
    >
      <Box className="paper-container">
        <Box
          className="paper-header"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography variant="h4">{saving.name}</Typography>
          <SimpleMenu
            thunk={delSavings}
            dataId={saving.id}
            setUpdate={setUpdate}
          />
        </Box>

        <Box
          className="paper-body"
          sx={{ display: 'flex', justifyContent: 'space-between', height: 60 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="h6" sx={{ color: 'red' }}>
              ${saving.amount}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Typography variant="h6">
            {new Date(saving.goalDate).toDateString()}
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
