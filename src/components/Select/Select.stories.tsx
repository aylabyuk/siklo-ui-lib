import figma from '@figma/code-connect'

import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './Select'

const SelectExample = figma.connect(SelectTrigger, {
  props: {
    placeholder: figma.string('Placeholder'),
    disabled: figma.boolean('Disabled'),
  },
  example: (props) => (
    <Select disabled={props.disabled}>
      <SelectTrigger>
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option-1">Option 1</SelectItem>
        <SelectItem value="option-2">Option 2</SelectItem>
        <SelectItem value="option-3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
})

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    design: {
      type: 'figma',
      url: 'TODO: Add Figma component URL',
      examples: [SelectExample],
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger aria-label="Fruit">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger aria-label="Food">
        <SelectValue placeholder="Select a food" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="potato">Potato</SelectItem>
          <SelectItem value="tomato">Tomato</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const Placeholder: Story = {
  render: () => (
    <Select>
      <SelectTrigger aria-label="Option">
        <SelectValue placeholder="Choose an option..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="one">Option One</SelectItem>
        <SelectItem value="two">Option Two</SelectItem>
        <SelectItem value="three">Option Three</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger aria-label="Disabled select">
        <SelectValue placeholder="Disabled select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="one">Option One</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('banana')

    return (
      <div>
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger aria-label="Fruit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
          </SelectContent>
        </Select>
        <p
          style={{
            marginTop: '0.5rem',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--semantic-muted-foreground)',
          }}
        >
          Selected: {value}
        </p>
      </div>
    )
  },
}
