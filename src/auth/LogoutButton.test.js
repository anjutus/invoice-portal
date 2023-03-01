import '@testing-library/jest-dom'
import { render, screen} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import LogoutButton from './LogoutButton'



test('LogoutButton Test', async () => {
    const route='/';
    render(
      <MemoryRouter initialEntries={[route]}>
        <LogoutButton />
      </MemoryRouter>,
    )
    expect(screen.getByRole('button',{ name: 'LogoutButton' }))
  })