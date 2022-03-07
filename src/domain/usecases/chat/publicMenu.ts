import { db } from '../../../infra/firebase'
import Chat from '@customTypes/Chat'
import { convertDocToUser } from '../../../utils'

export const addPerson = async (id: string, chatID: string, chat: Chat) => {
  const newMember = await db.collection('users').doc(id).get()

  db.collection('chats')
    .doc(chatID)
    .set(
      {
        members: [...chat.members, convertDocToUser(newMember)],
      },
      { merge: true }
    )
}

export const leaveChat = (chatID: string, chat: Chat, user: any) => {
  db.collection('chats')
    .doc(chatID)
    .set(
      {
        members: chat.members.filter((member) => member.uid !== user.uid),
      },
      { merge: true }
    )
}

export const deleteChat = (chatID: string) => {
  db.collection('chats').doc(chatID).delete()
}

export const renameChat = (newName: string, chatID: string) => {
  db.collection('chats').doc(chatID).set(
    {
      name: newName,
    },
    { merge: true }
  )
}
