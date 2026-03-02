import { create } from 'storybook/theming/create'

export default create({
  base: 'light',

  // Brand
  brandTitle: 'Siklo Design System',
  brandUrl: '/',
  brandImage: './siklo-icon-small.svg',

  // Typography
  fontBase: 'Inter, system-ui, sans-serif',
  fontCode: 'monospace',

  // Colors
  colorPrimary: '#2563eb',
  colorSecondary: '#2563eb',

  // UI
  appBg: '#f8fafc',
  appContentBg: '#ffffff',
  appBorderColor: '#e2e8f0',
  appBorderRadius: 6,

  // Text
  textColor: '#020617',
  textInverseColor: '#ffffff',
  textMutedColor: '#64748b',

  // Toolbar
  barTextColor: '#64748b',
  barSelectedColor: '#2563eb',
  barHoverColor: '#2563eb',
  barBg: '#ffffff',

  // Inputs
  inputBg: '#ffffff',
  inputBorder: '#e2e8f0',
  inputTextColor: '#020617',
  inputBorderRadius: 6,
})
