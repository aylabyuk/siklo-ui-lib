import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ToastProvider, useToast } from './Toast'

afterEach(() => cleanup())

const ToastTrigger = ({
  title = 'Test toast',
  description,
  variant,
  duration,
  action,
}: {
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning'
  duration?: number
  action?: { label: string; onClick: () => void }
}) => {
  const { toast } = useToast()
  return (
    <button
      onClick={() => toast({ title, description, variant, duration, action })}
    >
      Trigger
    </button>
  )
}

function renderToast(
  triggerProps: React.ComponentProps<typeof ToastTrigger> = {},
  providerProps: { duration?: number } = {},
) {
  return render(
    <ToastProvider duration={providerProps.duration ?? 5000}>
      <ToastTrigger {...triggerProps} />
    </ToastProvider>,
  )
}

describe('Toast', () => {
  it('renders toast with title on trigger click', async () => {
    const user = userEvent.setup()
    renderToast({ title: 'Saved!' })

    await user.click(screen.getByRole('button', { name: 'Trigger' }))
    await waitFor(() => {
      expect(screen.getByText('Saved!')).toBeInTheDocument()
    })
  })

  it('renders toast with description', async () => {
    const user = userEvent.setup()
    renderToast({
      title: 'Success',
      description: 'Your changes were saved.',
    })

    await user.click(screen.getByRole('button', { name: 'Trigger' }))
    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument()
      expect(screen.getByText('Your changes were saved.')).toBeInTheDocument()
    })
  })

  it('applies variant data attribute', async () => {
    const user = userEvent.setup()
    renderToast({ title: 'Error', variant: 'error' })

    await user.click(screen.getByRole('button', { name: 'Trigger' }))
    await waitFor(() => {
      const toast = screen.getByText('Error').closest('[data-variant]')
      expect(toast).toHaveAttribute('data-variant', 'error')
    })
  })

  it('closes on close button click', async () => {
    const user = userEvent.setup()
    renderToast({ title: 'Dismissable' })

    await user.click(screen.getByRole('button', { name: 'Trigger' }))
    await waitFor(() => {
      expect(screen.getByText('Dismissable')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => {
      expect(screen.queryByText('Dismissable')).not.toBeInTheDocument()
    })
  })

  it('renders action button', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    renderToast({
      title: 'Deleted',
      action: { label: 'Undo', onClick: handleClick },
    })

    await user.click(screen.getByRole('button', { name: 'Trigger' }))
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Undo' }))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('renders multiple toasts', async () => {
    const user = userEvent.setup()
    renderToast({ title: 'Toast' })

    await user.click(screen.getByRole('button', { name: 'Trigger' }))
    await waitFor(() => {
      expect(screen.getByText('Toast')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Trigger' }))
    await waitFor(() => {
      const toasts = screen.getAllByText('Toast')
      expect(toasts.length).toBeGreaterThanOrEqual(2)
    })
  })

  it('toast is inside an accessible region', async () => {
    const user = userEvent.setup()
    renderToast({ title: 'Accessible toast' })

    await user.click(screen.getByRole('button', { name: 'Trigger' }))
    await waitFor(() => {
      const region = screen.getByRole('region')
      expect(region).toBeInTheDocument()
      expect(region).toHaveTextContent('Accessible toast')
    })
  })
})
