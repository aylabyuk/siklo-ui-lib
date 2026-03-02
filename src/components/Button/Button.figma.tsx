import figma from '@figma/code-connect'

import { Button } from './Button'

figma.connect(Button, 'TODO: Add Figma component URL', {
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
