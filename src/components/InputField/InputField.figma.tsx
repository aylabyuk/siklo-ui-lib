import figma from '@figma/code-connect'

import { InputField } from './InputField'

figma.connect(InputField, 'TODO: Add Figma component URL', {
  props: {
    label: figma.string('Label'),
    helperText: figma.string('Helper Text'),
    error: figma.string('Error'),
    disabled: figma.boolean('Disabled'),
    required: figma.boolean('Required'),
    placeholder: figma.string('Placeholder'),
  },
  example: (props) => (
    <InputField
      label={props.label}
      placeholder={props.placeholder}
      helperText={props.helperText}
      error={props.error}
      disabled={props.disabled}
      required={props.required}
    />
  ),
})
