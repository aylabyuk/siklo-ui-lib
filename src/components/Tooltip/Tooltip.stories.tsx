import figma from '@figma/code-connect'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { Tooltip, TooltipProvider } from './Tooltip'

const TooltipExample = figma.connect(Tooltip, {
  props: {
    content: figma.string('Content'),
    side: figma.enum('Side', {
      Top: 'top',
      Right: 'right',
      Bottom: 'bottom',
      Left: 'left',
    }),
  },
  example: (props) => (
    <Tooltip content={props.content} side={props.side}>
      <button>Hover me</button>
    </Tooltip>
  ),
})

const meta = {
  title: 'Components/Tooltip',
  parameters: {
    design: {
      type: 'figma',
      url: 'TODO: Add Figma component URL',
      examples: [TooltipExample],
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={200}>
        <div
          style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}
        >
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tooltip content="Save your changes">
      <Button>Hover me</Button>
    </Tooltip>
  ),
}

export const AllPlacements: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        maxWidth: '20rem',
      }}
    >
      <Tooltip content="Top tooltip" side="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" side="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
    </div>
  ),
}

export const CustomDelay: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Tooltip content="Instant (0ms)" delayDuration={0}>
        <Button variant="secondary">No delay</Button>
      </Tooltip>
      <Tooltip content="Slow (800ms)" delayDuration={800}>
        <Button variant="secondary">Slow delay</Button>
      </Tooltip>
    </div>
  ),
}

export const OnIcon: Story = {
  render: () => (
    <Tooltip content="Settings">
      <button
        aria-label="Settings"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: 'var(--radii-md)',
          border: '1px solid var(--semantic-border)',
          background: 'var(--semantic-background)',
          cursor: 'pointer',
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8 10a2 2 0 100-4 2 2 0 000 4z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M13.5 8a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </Tooltip>
  ),
}

export const LongContent: Story = {
  render: () => (
    <Tooltip content="This is a longer tooltip that demonstrates how the max-width constraint keeps the tooltip readable">
      <Button variant="secondary">Long tooltip</Button>
    </Tooltip>
  ),
}
