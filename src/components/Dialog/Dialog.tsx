import * as DialogPrimitive from '@radix-ui/react-dialog'

import styles from './Dialog.module.css'

/* ---------------------------------- Root ---------------------------------- */

export const Dialog = DialogPrimitive.Root

/* -------------------------------- Trigger -------------------------------- */

export const DialogTrigger = DialogPrimitive.Trigger

/* --------------------------------- Close --------------------------------- */

export const DialogClose = DialogPrimitive.Close

/* -------------------------------- Overlay -------------------------------- */

const DialogOverlay: React.FC<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
    ref?: React.Ref<HTMLDivElement>
  }
> = ({ className, ref, ...props }) => {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={`${styles.overlay} ${className ?? ''}`}
      {...props}
    />
  )
}

/* -------------------------------- Content -------------------------------- */

export interface DialogContentProps extends React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> {
  overlayClassName?: string
  ref?: React.Ref<HTMLDivElement>
}

export const DialogContent: React.FC<DialogContentProps> = ({
  className,
  overlayClassName,
  children,
  ref,
  ...props
}) => {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay className={overlayClassName} />
      <DialogPrimitive.Content
        ref={ref}
        className={`${styles.content} ${className ?? ''}`}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

/* --------------------------------- Title --------------------------------- */

export const DialogTitle: React.FC<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
    ref?: React.Ref<HTMLHeadingElement>
  }
> = ({ className, ref, ...props }) => {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={`${styles.title} ${className ?? ''}`}
      {...props}
    />
  )
}

/* ------------------------------ Description ------------------------------ */

export const DialogDescription: React.FC<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> & {
    ref?: React.Ref<HTMLParagraphElement>
  }
> = ({ className, ref, ...props }) => {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={`${styles.description} ${className ?? ''}`}
      {...props}
    />
  )
}
