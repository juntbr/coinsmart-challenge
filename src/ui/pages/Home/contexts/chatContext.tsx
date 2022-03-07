import { createContext, FC, useContext, ReactChild } from 'react'
import Chat from '@customTypes/Chat'

interface chatContextData {
  subscribeMessages(chatID: string): any
  sendMessage(params: sendMessageProps): any
  addPerson(id: string, chatID: string, chat: Chat): any
  deleteChat(chatID: string): any
  leaveChat(chatID: string, chat: Chat, user: any): any
  renameChat(newName: string, chatID: string): any
}

interface sendMessageProps {
  chatID: string
  input: string
  user: any
}

const DepsContext = createContext({} as chatContextData)

export function useChat() {
  return useContext(DepsContext)
}

export const DepsProvider: FC<{
  children: ReactChild | ReactChild[]
  subscribeMessages(chatID: string): any
  sendMessage(params: sendMessageProps): any
  addPerson(id: string, chatID: string, chat: Chat): any
  deleteChat(chatID: string): any
  leaveChat(chatID: string, chat: Chat, user: any): any
  renameChat(newName: string, chatID: string): any
}> = ({ children, ...services }) => {
  return (
    <DepsContext.Provider value={services}>{children}</DepsContext.Provider>
  )
}
