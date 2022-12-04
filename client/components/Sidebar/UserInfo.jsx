import React from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { grey } from '@mui/material/colors'
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
          <Avatar sx={{ bgcolor: grey[800] }}>WS</Avatar>{' '}
        </ListItemIcon>
        <ListItemText
          primary={<Typography style={{ fontSize: 20 }}>{name}</Typography>}
        />
        <IconButton>
          <ExitToAppIcon sx={{ fontSize: '35px', color: grey[600] }} />
        </IconButton>
      </ListItem>
    </List>
  )
}

export default UserInfo
