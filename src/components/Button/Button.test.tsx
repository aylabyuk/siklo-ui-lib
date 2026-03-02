import { describe, expect, it } from 'vitest'

import { render, screen } from '@testing-library/react'

import { Button } from './Button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Hello Siklo</Button>)
    expect(
      screen.getByRole('button', { name: 'Hello Siklo' }),
    ).toBeInTheDocument()
  })
})
