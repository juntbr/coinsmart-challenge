import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Picker from 'emoji-picker-react'
import { sendMessage } from '@domain/usecases/chat/chat'
import { AppState } from '@store'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import SendIcon from '@material-ui/icons/Send'
import { Box, IconButton, Input, Popover } from '@material-ui/core'
import useStyles from './styles'

const SendBox: FC = () => {
  const classes = useStyles()
  const user = useSelector((state: AppState) => state.user)
  const { chatID } = useParams<{ chatID: string }>()
  const [input, setInput] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  useEffect(() => {
    setInput('')
  }, [chatID])

  const internalSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input === '') return
    sendMessage({ chatID, user, input })
    setInput('')
  }

  const openEmojiPicker = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const closeEmojiPicker = () => {
    setAnchorEl(null)
  }

  const onEmojiClick = (event: any, emojiObject: any) => {
    setInput(input + emojiObject.emoji)
    closeEmojiPicker()
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      p={1}
      border={1}
      borderRight={0}
      borderBottom={0}
      borderLeft={0}
      borderColor={'divider'}
    >
      <IconButton onClick={openEmojiPicker}>
        <EmojiEmotionsIcon />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeEmojiPicker}
      >
        <Picker onEmojiClick={onEmojiClick} />
      </Popover>
      <form className={classes.form} onSubmit={internalSendMessage}>
        <Input
          className={classes.input}
          fullWidth
          disableUnderline
          placeholder="Aa"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
        <IconButton type="submit">
          <SendIcon />
        </IconButton>
      </form>
    </Box>
  )
}

export default SendBox
