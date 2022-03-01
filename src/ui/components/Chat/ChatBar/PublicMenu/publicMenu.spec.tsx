import PublicMenu from './PublicMenu'
import React from 'react'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render } from '@testing-library/react'
import { PUBLIC_MENU_MOCK } from '../../../../../__mocks__/publicMenu'
import Router from 'react-router-dom'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('it renders public menu correctly', () => {
  let store
  test('it renders menu correctly when isOwner == true', () => {
    store = mockStore({
      consumerReducer: {
        isLoadingConsumers: false,
        coupons: [],
      },
    })
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1234' })
    const { queryByTestId } = render(
      <Provider store={store}>
        <PublicMenu chat={PUBLIC_MENU_MOCK} isOwner={true} />
      </Provider>
    )
    expect(queryByTestId(/add-person/i)).toBeTruthy()
    expect(queryByTestId(/rename/i)).toBeTruthy()
    expect(queryByTestId(/delete/i)).toBeTruthy()
    expect(queryByTestId(/leave/i)).toBeFalsy()
  })
  test('it renders menu correctly when isOwner == false', () => {
    store = mockStore({})
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1234' })
    const { queryByTestId } = render(
      <Provider store={store}>
        <PublicMenu chat={PUBLIC_MENU_MOCK} isOwner={false} />
      </Provider>
    )
    expect(queryByTestId(/add-person/i)).toBeTruthy()
    expect(queryByTestId(/rename/i)).toBeFalsy()
    expect(queryByTestId(/delete/i)).toBeFalsy()
    expect(queryByTestId(/leave/i)).toBeTruthy()
  })
})
