import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from './Button'

afterEach(() => cleanup())

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies variant data attribute', () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole('button', { name: 'Delete' })).toHaveAttribute(
      'data-variant',
      'destructive',
    )
  })

  it('applies size data attribute', () => {
    render(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button', { name: 'Large' })).toHaveAttribute(
      'data-size',
      'lg',
    )
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)

    await user.click(screen.getByRole('button', { name: 'Click' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('prevents clicks when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    )

    await user.click(screen.getByRole('button', { name: 'Disabled' }))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('sets aria-disabled when disabled', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button', { name: 'Disabled' })).toHaveAttribute(
      'aria-disabled',
      'true',
    )
  })

  it('prevents clicks when loading', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button loading onClick={onClick}>
        Loading
      </Button>,
    )

    await user.click(screen.getByRole('button', { name: 'Loading' }))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('sets aria-busy when loading', () => {
    render(<Button loading>Saving</Button>)
    const button = screen.getByRole('button', { name: 'Saving' })
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).toHaveAttribute('aria-disabled', 'true')
  })

  it('shows spinner when loading', () => {
    const { container } = render(<Button loading>Saving</Button>)
    const spinner = container.querySelector('[class*="spinner"]')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveAttribute('aria-hidden', 'true')
  })

  it('responds to Enter key', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Enter</Button>)

    screen.getByRole('button', { name: 'Enter' }).focus()
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('responds to Space key', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Space</Button>)

    screen.getByRole('button', { name: 'Space' }).focus()
    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders as child element with asChild', () => {
    render(
      <Button asChild variant="primary">
        <a href="/test">Link Button</a>
      </Button>,
    )
    const link = screen.getByRole('link', { name: 'Link Button' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
    expect(link).toHaveAttribute('data-variant', 'primary')
  })

  it('renders icon slots', () => {
    render(
      <Button iconLeft={<span data-testid="left">←</span>}>With Icon</Button>,
    )
    expect(screen.getByTestId('left')).toBeInTheDocument()
  })
})
