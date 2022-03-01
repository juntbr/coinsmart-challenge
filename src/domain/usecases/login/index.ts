import firebase from 'firebase/app'
import { auth, db, provider } from '../../../infra/firebase'

export const Auth = async () => {
  const { user } = await auth.signInWithPopup(provider)
  if (user) saveUserData(user)

  return user
}

const saveUserData = (user: firebase.User) => {
  db.collection('users').doc(user.uid).set(
    {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    },
    {
      merge: true
    }
  )
}
