import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import EditIcon from '@mui/icons-material/Edit'
import MenuList from '@mui/material/MenuList'
import DeleteIcon from '@mui/icons-material/Delete'
import { delTransaction } from '../actions/transactions'
import { useDispatch } from 'react-redux'
import EditForm from './EditForm'

const ITEM_HEIGHT = 48

export default function EditDeleteTransaction({ transaction }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [updating, setUpdating] = React.useState(false)

  const open = Boolean(anchorEl)
  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    setAnchorEl(null)
    dispatch(delTransaction(Number(transaction.id)))
  }

  function handleEdit(event) {
    event.preventDefault()
    setAnchorEl(null)
    setUpdating(true)
  }

  return updating ? (
    <EditForm transaction={transaction} setUpdating={setUpdating} />
  ) : (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuList>
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText value={transaction.id}>Delete</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}
