import * as DialogPrimitive from '@radix-ui/react-dialog'

import styles from './Dialog.module.css'

/* ---------------------------------- Root ---------------------------------- */

export const Dialog = DialogPrimitive.Root

/* -------------------------------- Trigger -------------------------------- */

export const DialogTrigger = DialogPrimitive.Trigger

/* --------------------------------- Close --------------------------------- */

export const DialogClose = DialogPrimitive.Close

/* -------------------------------- Overlay -------------------------------- */

const DialogOverlay = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
  ref?: React.Ref<HTMLDivElement>
}) => {
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

export const DialogContent = ({
  className,
  overlayClassName,
  children,
  ref,
  ...props
}: DialogContentProps) => {
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

export const DialogTitle = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
  ref?: React.Ref<HTMLHeadingElement>
}) => {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={`${styles.title} ${className ?? ''}`}
      {...props}
    />
  )
}

/* ------------------------------ Description ------------------------------ */

export const DialogDescription = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> & {
  ref?: React.Ref<HTMLParagraphElement>
}) => {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={`${styles.description} ${className ?? ''}`}
      {...props}
    />
  )
}
