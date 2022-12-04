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
    <ListItem>
      <Link to={`${path}`} style={{ textDecoration: 'none', color: '#707070' }}>
        <ListItemButton sx={{ width: 200 }}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </Link>
    </ListItem>
  )
}

export default NavLink
