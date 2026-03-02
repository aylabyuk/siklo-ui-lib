import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import styles from './Tooltip.module.css'

/* -------------------------------- Provider -------------------------------- */

/** Wraps your app to provide global tooltip configuration like delay duration. */
export const TooltipProvider = TooltipPrimitive.Provider

/* -------------------------------- Tooltip -------------------------------- */

/** An accessible tooltip that appears on hover and keyboard focus. Built on Radix Tooltip. */
export interface TooltipProps {
  /** The content displayed inside the tooltip popup. */
  content: React.ReactNode
  /** Which side of the trigger the tooltip appears on. */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Alignment of the tooltip relative to the trigger. */
  align?: 'start' | 'center' | 'end'
  /** Milliseconds to wait before showing the tooltip. Overrides the provider's default. */
  delayDuration?: number
  /** The trigger element that the tooltip is attached to. */
  children: React.ReactNode
  /** Controlled open state. */
  open?: boolean
  /** The initial open state when uncontrolled. */
  defaultOpen?: boolean
  /** Callback when the open state changes. */
  onOpenChange?: (open: boolean) => void
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  side = 'top',
  align = 'center',
  delayDuration,
  children,
  open,
  defaultOpen,
  onOpenChange,
}) => {
  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      delayDuration={delayDuration}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          className={styles.content}
          side={side}
          align={align}
          sideOffset={6}
        >
          {content}
          <TooltipPrimitive.Arrow className={styles.arrow} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
