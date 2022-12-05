import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <Box sx={{ height: '100vh' }}>
      <Grid container>
        {/* <Grid item sx={{ width: '20vw' }}> */}
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        {/* <Grid item sx={{ width: '70vw'}} > */}
        <Grid item xs={12} sm={8} md={8} lg={8}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Layout
