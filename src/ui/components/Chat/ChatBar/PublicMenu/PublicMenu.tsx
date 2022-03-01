import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserSearch from '../../../UserSearch/UserSearch'
import Chat from '../../../../../types/Chat'
import InputBox from '../../../InputBox/InputBox'
import { AppState } from '../../../../../store'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import DeleteIcon from '@material-ui/icons/Delete'
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
} from '@material-ui/core'
import {
  addPerson,
  deleteChat,
  leaveChat,
  renameChat,
} from '../../../../../domain/usecases/chat/publicMenu'

interface Props {
  chat: Chat
  isOwner: boolean
}

const PublicMenu = ({ chat, isOwner }: Props) => {
  const user = useSelector((state: AppState) => state.user)
  const { chatID } = useParams<{ chatID: string }>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isAddPersonDialogOpen, setIsAddPersonDialogOpen] = useState(false)
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)

  const openMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  const openAddPersonDialog = () => {
    setIsAddPersonDialogOpen(true)
    closeMenu()
  }

  const closeAddPersonDialog = () => {
    setIsAddPersonDialogOpen(false)
  }

  const openRenameDialog = () => {
    setIsRenameDialogOpen(true)
    closeMenu()
  }

  const closeRenameDialog = () => {
    setIsRenameDialogOpen(false)
  }

  const addPersons = async (id: string) => {
    if (chat.members.find((member) => member.uid === id))
      return addPerson(id, chatID, chat)
  }

  const internalDeleteChat = () => {
    if (!isOwner) return
    deleteChat(chatID)
  }
  const internalLeaveChat = () => {
    leaveChat(chatID, chat, user)
  }

  const internalRenameChat = (newName: string) => {
    renameChat(newName, chatID)
    closeRenameDialog()
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
        <MenuItem onClick={openAddPersonDialog} data-testid="add-person">
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Add person" />
        </MenuItem>
        {isOwner ? (
          <MenuItem onClick={openRenameDialog} data-testid="rename">
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Rename" />
          </MenuItem>
        ) : (
          ''
        )}
        {isOwner ? (
          <MenuItem onClick={internalDeleteChat} data-testid="delete">
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        ) : (
          <MenuItem onClick={internalLeaveChat} data-testid="leave">
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Leave" />
          </MenuItem>
        )}
        <Dialog open={isAddPersonDialogOpen} onClose={closeAddPersonDialog}>
          <UserSearch
            onItemClick={addPersons}
            onCancel={closeAddPersonDialog}
            avoidIdList={chat.members.map((member) => member.uid)}
          />
        </Dialog>
        <Dialog open={isRenameDialogOpen} onClose={closeRenameDialog}>
          <InputBox
            onSubmit={internalRenameChat}
            onCancel={closeRenameDialog}
            confirmBtnName={'Rename'}
            placeholder="New name"
          />
        </Dialog>
      </Menu>
    </>
  )
}

export default PublicMenu
