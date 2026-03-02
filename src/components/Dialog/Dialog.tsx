import * as DialogPrimitive from '@radix-ui/react-dialog'

import styles from './Dialog.module.css'

/* ---------------------------------- Root ---------------------------------- */

/** An accessible modal dialog built on Radix Dialog with focus trapping, overlay, and enter/exit animations. */
export const Dialog = DialogPrimitive.Root

/* -------------------------------- Trigger -------------------------------- */

/** The button or element that opens the dialog. */
export const DialogTrigger = DialogPrimitive.Trigger

/* --------------------------------- Close --------------------------------- */

/** A button that closes the dialog. */
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

/** The content panel of the dialog, rendered in a portal with an overlay. */
export interface DialogContentProps extends React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> {
  /** Custom class name for the overlay backdrop. */
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

/** An accessible title for the dialog, linked via `aria-labelledby`. */
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

/** An accessible description for the dialog, linked via `aria-describedby`. */
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
