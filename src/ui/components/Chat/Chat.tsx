import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ChatBar from './ChatBar'
import Messages from './Messages'
import SendBox from './SendBox'
import { AppState } from '../../../store'
import { Box } from '@material-ui/core'
import { DepsProvider } from '../../pages/Home/contexts/chatContext'
import {
  addPerson,
  deleteChat,
  leaveChat,
  renameChat,
} from '@domain/usecases/chat/publicMenu'
import { subscribeMessages, sendMessage } from '@domain/usecases/chat/chat'

const Chat = () => {
  const chats = useSelector((state: AppState) => state.chats)
  const { chatID } = useParams<{ chatID: string }>()

  if (!chats.find((chat) => chat.id === chatID)) return <></>

  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <DepsProvider
        subscribeMessages={subscribeMessages}
        sendMessage={sendMessage}
        addPerson={addPerson}
        deleteChat={deleteChat}
        leaveChat={leaveChat}
        renameChat={renameChat}
      >
        <ChatBar />
        <Messages />
        <SendBox />
      </DepsProvider>
    </Box>
  )
}

export default Chat
