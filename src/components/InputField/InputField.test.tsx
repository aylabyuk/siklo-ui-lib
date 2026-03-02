import { afterEach, describe, expect, it } from 'vitest'

import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { InputField } from './InputField'

afterEach(() => cleanup())

describe('InputField', () => {
  it('renders label linked to input via htmlFor', () => {
    render(<InputField label="Email" />)

    const input = screen.getByLabelText('Email')
    expect(input).toBeInTheDocument()
    expect(input.tagName).toBe('INPUT')
  })

  it('uses a custom id when provided', () => {
    render(<InputField label="Email" id="my-email" />)

    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('id', 'my-email')
  })

  it('renders helper text linked via aria-describedby', () => {
    render(<InputField label="Password" helperText="Must be 8+ chars." />)

    const input = screen.getByLabelText('Password')
    const helper = screen.getByText('Must be 8+ chars.')
    expect(input).toHaveAttribute('aria-describedby', helper.id)
  })

  it('renders error message and sets aria-invalid', () => {
    render(<InputField label="Email" error="Invalid email." />)

    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')

    const error = screen.getByRole('alert')
    expect(error).toHaveTextContent('Invalid email.')
    expect(input).toHaveAttribute('aria-describedby', error.id)
  })

  it('error replaces helper text', () => {
    render(
      <InputField
        label="Email"
        helperText="We won't share it."
        error="Invalid email."
      />,
    )

    expect(screen.getByText('Invalid email.')).toBeInTheDocument()
    expect(screen.queryByText("We won't share it.")).not.toBeInTheDocument()
  })

  it('sets aria-required when required', () => {
    render(<InputField label="Name" required />)

    const input = screen.getByLabelText(/Name/)
    expect(input).toHaveAttribute('aria-required', 'true')
    expect(input).toBeRequired()
  })

  it('shows required asterisk', () => {
    render(<InputField label="Name" required />)

    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('disables the input when disabled', () => {
    render(<InputField label="Email" disabled />)

    const input = screen.getByLabelText('Email')
    expect(input).toBeDisabled()
  })

  it('accepts user input', async () => {
    const user = userEvent.setup()
    render(<InputField label="Email" />)

    const input = screen.getByLabelText('Email')
    await user.type(input, 'hello@example.com')
    expect(input).toHaveValue('hello@example.com')
  })

  it('renders with type="password"', () => {
    render(<InputField label="Password" type="password" />)

    const input = screen.getByLabelText('Password')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('does not have aria-invalid when no error', () => {
    render(<InputField label="Email" />)

    const input = screen.getByLabelText('Email')
    expect(input).not.toHaveAttribute('aria-invalid')
  })

  it('does not have aria-describedby when no helper or error', () => {
    render(<InputField label="Email" />)

    const input = screen.getByLabelText('Email')
    expect(input).not.toHaveAttribute('aria-describedby')
  })
})
