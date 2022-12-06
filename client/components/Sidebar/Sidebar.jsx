import React from 'react'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import PaymentsIcon from '@mui/icons-material/Payments'
import { Box, Grid, List, Paper } from '@mui/material'

import NavLink from './NavLink'
import UserInfo from './UserInfo'

function Sidebar() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Paper
        sx={{
          height: '100vh',
          width: 300,
          position: 'sticky',
          background:
            'linear-gradient(172deg, rgba(16,15,15,1) 32%, rgba(15,61,62,1) 93%)',
        }}
      >
        <Grid
          sx={{ height: '98vh', width: '100%' }}
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            component="img"
            src="/images/logo.svg"
            alt="logo"
            marginTop="50px"
            sx={{ height: 60, width: 220 }}
          />

          <List sx={{ height: '50vh', width: 220 }}>
            <NavLink
              icon={<EqualizerIcon sx={{ color: '#F1F1F1' }} />}
              text={'Dashboard'}
              path={'/'}
            />
            <NavLink
              icon={<ReceiptLongIcon sx={{ color: '#F1F1F1' }} />}
              text={'Transactions'}
              path={'/transactions'}
            />
            <NavLink
              icon={<PaymentsIcon sx={{ color: '#F1F1F1' }} />}
              text={'Expenses'}
              path={'/expenses/1'}
            />
          </List>

          <UserInfo name={'John Doe'} />
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Sidebar
