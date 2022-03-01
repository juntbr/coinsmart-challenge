import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyDebg0Q7Mtx21Pp4DPHw9M1EpVwbN9DsbY',
  authDomain: 'coinsmart-challenge.firebaseapp.com',
  projectId: 'coinsmart-challenge',
  storageBucket: '=coinsmart-challenge.appspot.com',
  messagingSenderId: '132367642346',
  appId: '1:132367642346:web:3b185fe04e34d51eb23193',
})

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID
// })

const auth = app.auth()
const db = app.firestore()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, db, provider }
