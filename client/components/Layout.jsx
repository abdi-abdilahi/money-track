import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import { Grid, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <Grid container wrap="nowrap" sx={{ margin: 0, width: '100vw' }}>
      <Grid item md={3} lg={3} xl={2}>
        <Sidebar />
      </Grid>
      <Grid item sx={{ width: '90vw', backgroundColor: '#F1F1F1' }}>
        <Container fixed sx={{ minWidth: '90%', paddingTop: 5 }}>
          <Outlet />
        </Container>
      </Grid>
    </Grid>
  )
}

export default Layout
