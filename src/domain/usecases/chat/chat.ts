import { db } from '../../../infra/firebase'
import firebase from 'firebase/app'

interface sendMessageProps {
    chatID: string,
    input: string,
    user: any
}

export const sendMessage = async (params:sendMessageProps) => {
  const { chatID, user, input } = params
  await db
    .collection('messages')
    .doc(chatID)
    .collection('messages')
    .add({
      text: input,
      sentAt: firebase.firestore.FieldValue.serverTimestamp(),
      sentBy: {
        uid: user.uid,
        displayName: user.displayName
      }
    })

  await db
    .collection('chats')
    .doc(chatID)
    .set(
      {
        recentMessage: {
          text: input,
          sentAt: firebase.firestore.FieldValue.serverTimestamp(),
          sentBy: {
            uid: user.uid,
            displayName: user.displayName
          }
        }
      },
      { merge: true }
    )
}
