import ChatBar from './ChatBar'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render, screen } from '@testing-library/react'
import { CHAT_BAR_MOCK } from '../../../../__mocks__/chatBar'
// eslint-disable-next-line import/default
import Router from 'react-router-dom'
import '@testing-library/jest-dom'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}))

const USER_MOCK = {
  uid: 'gS7rEXTHrBSddOGBy6enKSE1Cmy1',
  displayName: 'Victor Hugo Schneider de Almeida',
  email: 'victorhugoschneiderr@gmail.com',
  photoURL:
    'https://lh3.googleusercontent.com/a/AATXAJxLhy7CK7ul62DpYkpwFj_UxkTQmngMwtEeesST=s96-c',
}

// eslint-disable-next-line @typescript-eslint/ban-types
const mockStore = configureStore([])

describe('it renders public chatbar correctly', () => {
  let store
  test('it shows last message correcty', () => {
    store = mockStore({
      chats: CHAT_BAR_MOCK,
      user: USER_MOCK,
    })
    jest
      .spyOn(Router, 'useParams')
      .mockReturnValue({ chatID: 'wkT92G2DfO9GE02zPIHH' })
    const { queryByTestId } = render(
      <Provider store={store}>
        <ChatBar />
      </Provider>
    )
    expect(queryByTestId(/chat-user/i)).toBeTruthy()
    expect(screen.getByText('Last message at 01/03 18:11')).toBeInTheDocument()
  })
  test('it shows last message correcty', () => {
    store = mockStore({
      chats: CHAT_BAR_MOCK,
      user: USER_MOCK,
    })
    jest
      .spyOn(Router, 'useParams')
      .mockReturnValue({ chatID: 'wkT92G2DfO9GE02zPIHH' })
    const { queryByTestId } = render(
      <Provider store={store}>
        <ChatBar />
      </Provider>
    )
    expect(queryByTestId(/chat-user/i)).toBeTruthy()
    expect(screen.getByText('Last message at 01/03 18:11')).toBeInTheDocument()
  })
})
