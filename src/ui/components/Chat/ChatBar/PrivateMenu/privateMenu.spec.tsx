import PrivateMenu from './PrivateMenu'
import React from 'react'
import { render } from '@testing-library/react'
import Router from 'react-router-dom'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}))

describe('it renders private menu correctly', () => {
  test('it renders menu correctly', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1234' })
    const { queryByTestId } = render(<PrivateMenu />)
    expect(queryByTestId(/delete/i)).toBeTruthy()
  })
})
