import { afterEach, describe, expect, it } from 'vitest'

import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Tooltip, TooltipProvider } from './Tooltip'

afterEach(() => cleanup())

function renderTooltip(
  props: Partial<React.ComponentProps<typeof Tooltip>> = {},
) {
  return render(
    <TooltipProvider delayDuration={0}>
      <Tooltip content="Helpful tip" {...props}>
        <button>Trigger</button>
      </Tooltip>
    </TooltipProvider>,
  )
}

describe('Tooltip', () => {
  it('does not show tooltip by default', () => {
    renderTooltip()
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup()
    renderTooltip()

    await user.hover(screen.getByRole('button', { name: 'Trigger' }))
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument()
    })
    expect(screen.getByRole('tooltip')).toHaveTextContent('Helpful tip')
  })

  it('shows tooltip on focus', async () => {
    const user = userEvent.setup()
    renderTooltip()

    await user.tab()
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument()
    })
  })

  it('hides tooltip on blur', async () => {
    const user = userEvent.setup()
    renderTooltip()

    await user.tab()
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument()
    })

    await user.tab()
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })
  })

  it('has role="tooltip"', async () => {
    const user = userEvent.setup()
    renderTooltip()

    await user.hover(screen.getByRole('button', { name: 'Trigger' }))
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument()
    })
  })

  it('renders custom content', async () => {
    const user = userEvent.setup()
    renderTooltip({ content: 'Custom message' })

    await user.hover(screen.getByRole('button', { name: 'Trigger' }))
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toHaveTextContent('Custom message')
    })
  })
})
