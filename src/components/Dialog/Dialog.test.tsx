import { afterEach, describe, expect, it } from 'vitest'

import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './Dialog'

afterEach(() => cleanup())

function renderDialog() {
  return render(
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogTitle>Test Dialog</DialogTitle>
        <DialogDescription>Test description</DialogDescription>
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </Dialog>,
  )
}

describe('Dialog', () => {
  it('opens on trigger click', async () => {
    const user = userEvent.setup()
    renderDialog()

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    renderDialog()

    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('closes on close button click', async () => {
    const user = userEvent.setup()
    renderDialog()

    await user.click(screen.getByRole('button', { name: 'Open' }))
    await user.click(screen.getByRole('button', { name: 'Close' }))

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('moves focus into dialog on open', async () => {
    const user = userEvent.setup()
    renderDialog()

    await user.click(screen.getByRole('button', { name: 'Open' }))
    const dialog = screen.getByRole('dialog')

    await waitFor(() => {
      expect(dialog.contains(document.activeElement)).toBe(true)
    })
  })

  it('returns focus to trigger on close', async () => {
    const user = userEvent.setup()
    renderDialog()

    const trigger = screen.getByRole('button', { name: 'Open' })
    await user.click(trigger)
    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(document.activeElement).toBe(trigger)
    })
  })

  it('has accessible role and labelling', async () => {
    const user = userEvent.setup()
    renderDialog()

    await user.click(screen.getByRole('button', { name: 'Open' }))
    const dialog = screen.getByRole('dialog')

    expect(dialog).toHaveAttribute('aria-labelledby')
    expect(dialog).toHaveAttribute('aria-describedby')

    const titleId = dialog.getAttribute('aria-labelledby')!
    const descId = dialog.getAttribute('aria-describedby')!
    expect(document.getElementById(titleId)?.textContent).toBe('Test Dialog')
    expect(document.getElementById(descId)?.textContent).toBe(
      'Test description',
    )
  })

  it('renders title and description', async () => {
    const user = userEvent.setup()
    renderDialog()

    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByText('Test Dialog')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })
})
