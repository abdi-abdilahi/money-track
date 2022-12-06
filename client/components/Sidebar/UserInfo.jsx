import React from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import PersonIcon from '@mui/icons-material/Person'
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
          <Avatar sx={{ bgcolor: '#F1F1F1' }}>
            <PersonIcon sx={{ color: '#0F3D3E', fontSize: 24 }} />
          </Avatar>
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography style={{ fontSize: 18, color: '#F1F1F1' }}>
              {name}
            </Typography>
          }
        />
        <IconButton>
          <ExitToAppIcon sx={{ fontSize: 24, color: '#F1F1F1' }} />
        </IconButton>
      </ListItem>
    </List>
  )
}

export default UserInfo
