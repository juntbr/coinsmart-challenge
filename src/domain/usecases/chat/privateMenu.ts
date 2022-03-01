import { db } from '../../../infra/firebase'

export const deleteChat = (chatID: string) => {
  db.collection('chats').doc(chatID).delete()
}
