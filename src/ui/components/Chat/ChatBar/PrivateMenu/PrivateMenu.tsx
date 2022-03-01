import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import BlockIcon from '@material-ui/icons/Block'
import DeleteIcon from '@material-ui/icons/Delete'
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { deleteChat } from '../../../../../domain/usecases/chat/publicMenu'

const PrivateMenu = () => {
  const { chatID } = useParams<{ chatID: string }>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const openMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const internalDeleteChat = () => {
    deleteChat(chatID)
    closeMenu()
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={openMenu}>
        <MoreHorizIcon></MoreHorizIcon>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem disabled onClick={closeMenu}>
          <ListItemIcon>
            <BlockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Block" />
        </MenuItem>
        <MenuItem onClick={internalDeleteChat} data-testid="delete">
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </>
  )
}

export default PrivateMenu
