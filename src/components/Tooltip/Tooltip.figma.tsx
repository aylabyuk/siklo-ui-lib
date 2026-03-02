import figma from '@figma/code-connect'

import { Tooltip } from './Tooltip'

figma.connect(Tooltip, 'TODO: Add Figma component URL', {
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
