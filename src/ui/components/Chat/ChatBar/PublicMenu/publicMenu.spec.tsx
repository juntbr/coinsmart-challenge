import PublicMenu from './PublicMenu'
import React from 'react'Ï
import { render } from '@testing-library/react'


describe('it renders correctly', () => {
    const { getByRole } = render(<PublicMenu />)
})
