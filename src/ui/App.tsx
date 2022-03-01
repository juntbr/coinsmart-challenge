import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import Login from './pages/Login'
import Loading from './pages/Loading'
import { auth } from '../infra/firebase'
import { convertDocToChat, convertDocToUser } from '../utils'
import { USER_INIT_STATE } from '../application/reducers/user'
import { CHATS_INIT_STATE } from '../application/reducers/chats'
import { setChats, setUser } from '../application/actions'
import { Auth } from '../domain/usecases/login/index'
import { fetchUserData, subscribeChats } from '../domain/usecases/main/main'
import Home from './pages/Home'

const App = () => {
  const dispatch = useDispatch()
  const [user, loading] = useAuthState(auth)
  const [fetchingUserData, setFetchingUserData] = useState(true)
  const [fetchingChatsData, setFetchingChatsData] = useState(true)

  useEffect(() => {
    if (!user) {
      dispatch(setUser(USER_INIT_STATE))
      dispatch(setChats(CHATS_INIT_STATE))
      setFetchingUserData(true)
      setFetchingChatsData(true)
    }

    internalfFetchUserData()
    const unsubscribe = internalSubscribeChats()

    return () => {
      unsubscribe()
    }
  }, [user])

  const internalfFetchUserData = async () => {
    if (!user) return

    await fetchUserData(user)
      .then((snapshot) => {
        dispatch(setUser(convertDocToUser(snapshot)))
        setFetchingUserData(false)
      })
  }

  const internalSubscribeChats = () => {
    if (!user) return () => { }

    return subscribeChats(user)
      .onSnapshot((snapshot) => {
        const chats = snapshot.docs.map((doc) => convertDocToChat(doc))
        dispatch(setChats(chats))
        setFetchingChatsData(false)
      })
  }

  if (loading || (user && (fetchingUserData || fetchingChatsData))) { return <Loading /> }

  if (!user) return <Login Auth={Auth} />
  return <Home />
}

export default App
