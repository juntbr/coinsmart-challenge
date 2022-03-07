import { db } from '../../../infra/firebase'
import firebase from 'firebase/app'

export const fetchUserData = async (user: any) => {
  return db.collection('users').doc(user.uid).get()
}

export const subscribeChats = (user: firebase.User) => {
  return db.collection('chats').where('members', 'array-contains', {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  })
}
