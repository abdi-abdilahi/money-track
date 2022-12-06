import React from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
} from '@mui/material'

function UserInfo({ name }) {
  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <Avatar sx={{ bgcolor: '#F1F1F1', color: '#0F3D3E' }}>WS</Avatar>{' '}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography style={{ fontSize: 20, color: '#F1F1F1' }}>
              {name}
            </Typography>
          }
        />
        <IconButton>
          <ExitToAppIcon sx={{ fontSize: '35px', color: '#F1F1F1' }} />
        </IconButton>
      </ListItem>
    </List>
  )
}

export default UserInfo
