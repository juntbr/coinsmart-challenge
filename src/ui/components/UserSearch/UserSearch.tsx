import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import User from '@customTypes/User'
import { db } from '@infra/firebase'
import { AppState } from '../../../store'
import { convertDocToUser } from '../../../utils'
import { Avatar, Box, Button, Input, List, ListItem } from '@material-ui/core'
import useStyles from './styles'

interface Props {
  onItemClick: (id: string) => void
  onCancel: () => void
  avoidIdList?: (string | undefined)[]
}

const UserSearch = ({ onItemClick, onCancel, avoidIdList }: Props) => {
  const classes = useStyles()
  const user = useSelector((state: AppState) => state.user)
  const [input, setInput] = useState('')
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    await db
      .collection('users')
      .orderBy('displayName')
      .get()
      .then((snapshot) => {
        setUsers(snapshot.docs.map((doc) => convertDocToUser(doc)))
      })
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  const filterResults = (word: string, users: User[]) => {
    const regex = new RegExp(word, 'gi')
    return users.filter(
      (otherUser) =>
        otherUser.displayName.match(regex) &&
        otherUser.uid !== user.uid &&
        !avoidIdList?.find((IdToAvoid) => IdToAvoid === otherUser.uid)
    )
  }

  const usersList = filterResults(input, users).map((user) => (
    <ListItem
      key={user.uid}
      id={user.uid}
      className={classes.li}
      button
      onClick={(e: React.MouseEvent<HTMLDivElement>) =>
        onItemClick(e.currentTarget.id)
      }
    >
      <Avatar className={classes.avatar} src={user.photoURL} />
      {user.displayName}
    </ListItem>
  ))

  return (
    <Box p={2}>
      <Input
        className={classes.input}
        placeholder="Search person"
        onChange={handleInput}
        value={input}
        disableUnderline
        required
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
      <List className={classes.list}>{usersList}</List>
      <Button
        color="secondary"
        variant="contained"
        onClick={onCancel}
        fullWidth
      >
        Cancel
      </Button>
    </Box>
  )
}

export default UserSearch
