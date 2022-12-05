import React from 'react'
import Box from '@mui/material/Box'

import LinearProgress from '@mui/material/LinearProgress'

export default function ExpensesStatus({ progress }) {
  return (
    <Box sx={{ width: 175 }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        //change the progress bar colour to "text.primary"
        sx={{
          height: 15,
        }}
      />
    </Box>
  )
}
