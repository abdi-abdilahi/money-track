import React, { useState } from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

export default function ExpenseStatus() {
  const [progress, setProgress] = useState(50)

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress === 100) {
  //         return 0
  //       }
  //       const diff = Math.random() * 10
  //       return Math.min(oldProgress + diff, 100)
  //     })
  //   }, 500)

  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])
  //TODO: STYLE: make the color of the progress bar the same as the name of the expense
  return (
    <Box sx={{ width: 250, pt: 4 }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        //change the progress bar colour to "text.primary"
        sx={{ height: 15 }}
      />
    </Box>
  )
}
