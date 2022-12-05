import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <Box sx={{ height: '100vh' }}>
      <Grid container>
        <Grid item xs={4}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Layout
