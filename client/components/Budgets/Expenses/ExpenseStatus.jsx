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

  return (
    <Box sx={{ width: 500 }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  )
}
