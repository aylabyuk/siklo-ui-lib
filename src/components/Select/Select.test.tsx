import { afterEach, describe, expect, it } from 'vitest'

import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select'

afterEach(() => cleanup())

function renderSelect(
  props: { defaultValue?: string; disabled?: boolean } = {},
) {
  return render(
    <Select defaultValue={props.defaultValue} disabled={props.disabled}>
      <SelectTrigger>
        <SelectValue placeholder="Pick one" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>,
  )
}

describe('Select', () => {
  it('renders trigger with placeholder', () => {
    renderSelect()
    expect(screen.getByRole('combobox')).toHaveTextContent('Pick one')
  })

  it('opens on trigger click', async () => {
    const user = userEvent.setup()
    renderSelect()

    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('opens on Enter key', async () => {
    const user = userEvent.setup()
    renderSelect()

    screen.getByRole('combobox').focus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('opens on Space key', async () => {
    const user = userEvent.setup()
    renderSelect()

    screen.getByRole('combobox').focus()
    await user.keyboard(' ')
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    renderSelect()

    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  it('selects item on click', async () => {
    const user = userEvent.setup()
    renderSelect()

    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'Banana' }))

    await waitFor(() => {
      expect(screen.getByRole('combobox')).toHaveTextContent('Banana')
    })
  })

  it('displays default value', () => {
    renderSelect({ defaultValue: 'cherry' })
    expect(screen.getByRole('combobox')).toHaveTextContent('Cherry')
  })

  it('has correct ARIA roles', async () => {
    const user = userEvent.setup()
    renderSelect()

    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(3)
  })

  it('disables trigger when disabled', () => {
    renderSelect({ disabled: true })
    expect(screen.getByRole('combobox')).toBeDisabled()
  })
})
