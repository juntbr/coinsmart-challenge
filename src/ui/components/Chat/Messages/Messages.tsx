import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Message from '../../../../types/Message'
import { subscribeMessages } from '@domain/usecases/chat/chat'
import { AppState } from '../../../../store'
import { convertDocToMessage } from '../../../../utils'
import { Box, Typography } from '@material-ui/core'
import useStyles from './styles'

const Messages = () => {
  const classes = useStyles()
  const user = useSelector((state: AppState) => state.user)
  const scroll = useRef() as React.MutableRefObject<HTMLDivElement>
  const { chatID } = useParams<{ chatID: string }>()
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const unsubscribe = internalSubscribeMessages()

    return () => {
      unsubscribe()
    }
  }, [chatID])

  const internalSubscribeMessages = () => {
    return subscribeMessages(chatID).onSnapshot((snapshot) => {
      const messages = snapshot.docs.map((doc) => convertDocToMessage(doc))
      setMessages(messages)
      scroll.current.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <Box
      flex={1}
      className={classes.scrollBox}
      display="flex"
      flexDirection="column-reverse"
      p={2}
      pr={1}
    >
      <div ref={scroll}></div>
      {messages.map((message) => (
        <Box
          key={message.id}
          data-testid="messages"
          className={`${classes.message} ${
            message.sentBy.uid === user.uid ? classes.ownMessage : ''
          }`}
          p={1}
          mt={4}
        >
          <Typography className={classes.messageInfo} variant="caption">
            {message.sentBy.uid === user.uid
              ? 'You'
              : message.sentBy.displayName}
          </Typography>
          <Typography className={classes.messageText}>
            {message.text}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default Messages
