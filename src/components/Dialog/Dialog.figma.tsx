import figma from '@figma/code-connect'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './Dialog'

figma.connect(DialogContent, 'TODO: Add Figma component URL', {
  props: {
    title: figma.string('Title'),
    description: figma.string('Description'),
  },
  example: (props) => (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogDescription>{props.description}</DialogDescription>
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </Dialog>
  ),
})
