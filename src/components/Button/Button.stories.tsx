import figma from '@figma/code-connect'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './Button'

const ButtonExample = figma.connect(Button, 'TODO: Add Figma component URL', {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Ghost: 'ghost',
      Destructive: 'destructive',
    }),
    size: figma.enum('Size', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
    }),
    disabled: figma.boolean('Disabled'),
    loading: figma.boolean('Loading'),
    label: figma.string('Label'),
  },
  example: (props) => (
    <Button
      variant={props.variant}
      size={props.size}
      disabled={props.disabled}
      loading={props.loading}
    >
      {props.label}
    </Button>
  ),
})

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    design: {
      type: 'figma',
      url: 'TODO: Add Figma component URL',
      examples: [ButtonExample],
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button {...args} iconLeft={<span>←</span>}>
        Back
      </Button>
      <Button {...args} iconRight={<span>→</span>}>
        Next
      </Button>
      <Button {...args} iconLeft={<span>✎</span>} iconRight={<span>→</span>}>
        Edit & Continue
      </Button>
    </div>
  ),
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Saving...',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const AsLink: Story = {
  render: () => (
    <Button asChild variant="primary">
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        Visit Example
      </a>
    </Button>
  ),
}
