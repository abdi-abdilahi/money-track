import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <Grid container wrap="nowrap" sx={{ margin: 0, width: '100vw' }}>
      <Grid item sx={{ width: 300 }}>
        <Sidebar />
      </Grid>
      <Grid item sx={{ width: '90vw', backgroundColor: '#F1F1F1' }}>
        <Outlet />
      </Grid>
    </Grid>
  )
}

export default Layout
