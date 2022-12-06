import React from 'react'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Link } from 'react-router-dom'

function NavLink({ icon, text, path }) {
  return (
    <ListItem
      sx={{
        '&& .Mui-selected, && .Mui-selected:hover': {
          bgcolor: 'red',
          '&, & .MuiListItemIcon-root': {
            color: 'pink',
          },
        },
        '& .MuiListItemButton-root:hover': {
          bgcolor: '#0F3D3E',
          '&, & .MuiListItemIcon-root': {
            color: '#0F3D3E',
          },
        },
      }}
    >
      <Link
        to={`${path}`}
        style={{ textDecoration: 'none', color: '#E2DCC8', width: '100%' }}
      >
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText sx={{ color: '#F1F1F1' }} primary={text} />
        </ListItemButton>
      </Link>
    </ListItem>
  )
}

export default NavLink
