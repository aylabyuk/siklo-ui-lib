import figma from '@figma/code-connect'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { ToastProvider, useToast } from './Toast'

const ToastExample = figma.connect(
  ToastProvider,
  'TODO: Add Figma component URL',
  {
    props: {
      variant: figma.enum('Variant', {
        Default: 'default',
        Success: 'success',
        Error: 'error',
        Warning: 'warning',
      }),
      title: figma.string('Title'),
      description: figma.string('Description'),
    },
    example: (props) => {
      const { toast } = useToast()
      toast({
        title: props.title,
        description: props.description,
        variant: props.variant,
      })
    },
  },
)

const meta = {
  title: 'Components/Toast',
  component: ToastProvider,
  parameters: {
    design: {
      type: 'figma',
      url: 'TODO: Add Figma component URL',
      examples: [ToastExample],
    },
  },
  argTypes: {
    duration: {
      description:
        'Default auto-dismiss duration in milliseconds. Individual toasts can override this.',
      control: 'number',
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider duration={5000}>
        <Story />
      </ToastProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ToastProvider>

export default meta
type Story = StoryObj<typeof meta>

const DefaultDemo = () => {
  const { toast } = useToast()
  return (
    <Button
      onClick={() =>
        toast({
          title: 'Changes saved',
          description: 'Your settings have been updated successfully.',
        })
      }
    >
      Show toast
    </Button>
  )
}

export const Default: Story = {
  render: () => <DefaultDemo />,
}

const AllVariantsDemo = () => {
  const { toast } = useToast()
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Default notification',
            description: 'This is a default toast.',
          })
        }
      >
        Default
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Success!',
            description: 'Operation completed successfully.',
            variant: 'success',
          })
        }
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Error',
            description: 'Something went wrong. Please try again.',
            variant: 'error',
          })
        }
      >
        Error
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Warning',
            description: 'This action cannot be undone.',
            variant: 'warning',
          })
        }
      >
        Warning
      </Button>
    </div>
  )
}

export const AllVariants: Story = {
  render: () => <AllVariantsDemo />,
}

const WithActionDemo = () => {
  const { toast } = useToast()
  return (
    <Button
      onClick={() =>
        toast({
          title: 'Message deleted',
          description: 'The message has been moved to trash.',
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo clicked'),
          },
        })
      }
    >
      Delete message
    </Button>
  )
}

export const WithAction: Story = {
  render: () => <WithActionDemo />,
}

const AutoDismissDemo = () => {
  const { toast } = useToast()
  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Quick toast (2s)',
            duration: 2000,
          })
        }
      >
        2 seconds
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Long toast (10s)',
            description: 'This one sticks around longer.',
            duration: 10000,
          })
        }
      >
        10 seconds
      </Button>
    </div>
  )
}

export const AutoDismiss: Story = {
  render: () => <AutoDismissDemo />,
}

const MultipleToastsDemo = () => {
  const { toast } = useToast()
  let count = 0
  return (
    <Button
      onClick={() => {
        count++
        toast({
          title: `Notification #${count}`,
          description: 'Click again to stack more toasts.',
          variant: (['default', 'success', 'error', 'warning'] as const)[
            count % 4
          ],
        })
      }}
    >
      Stack toasts
    </Button>
  )
}

export const MultipleToasts: Story = {
  render: () => <MultipleToastsDemo />,
}
