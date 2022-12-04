import React from 'react'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import PaymentsIcon from '@mui/icons-material/Payments'
import { Box, Grid, CssBaseline, List, Paper } from '@mui/material'

import NavLink from './NavLink'
import UserInfo from './UserInfo'

function Sidebar() {
  return (
    <CssBaseline>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100vh', width: 250 }}
      >
        <Paper sx={{ height: '100vh', width: 250 }}>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            sx={{ height: '98vh' }}
          >
            <Box
              component="img"
              src="/images/logo.png"
              alt="logo"
              marginTop="50px"
              sx={{ height: 40, width: 200 }}
            />

            <List sx={{ height: '50vh', width: 250 }}>
              <NavLink icon={<EqualizerIcon />} text={'Dashboard'} path={'/'} />
              <NavLink
                icon={<ReceiptLongIcon />}
                text={'Transactions'}
                path={'/transactions'}
              />
              <NavLink
                icon={<PaymentsIcon />}
                text={'Expenses'}
                path={'/expenses/1'}
              />
            </List>

            <UserInfo name={'John Doe'} />
          </Grid>
        </Paper>
      </Grid>
    </CssBaseline>
  )
}

export default Sidebar
