import type { Meta, StoryObj } from '@storybook/react-vite'

import { InputField } from './InputField'

const meta = {
  title: 'Components/InputField',
  component: InputField,
  args: {
    label: 'Email',
  },
} satisfies Meta<typeof InputField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPlaceholder: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    defaultValue: 'not-an-email',
    error: 'Please enter a valid email address.',
  },
}

export const Required: Story = {
  args: {
    label: 'Full name',
    required: true,
    placeholder: 'Jane Doe',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Email',
    defaultValue: 'locked@example.com',
    disabled: true,
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
}

export const FormExample: Story = {
  render: () => (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        maxWidth: '24rem',
      }}
    >
      <InputField label="Full name" required placeholder="Jane Doe" />
      <InputField
        label="Email"
        type="email"
        required
        placeholder="you@example.com"
        helperText="We'll never share your email."
      />
      <InputField
        label="Password"
        type="password"
        required
        helperText="Must be at least 8 characters."
      />
      <InputField
        label="Confirm password"
        type="password"
        required
        error="Passwords do not match."
      />
    </form>
  ),
}
