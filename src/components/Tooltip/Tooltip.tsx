import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import styles from './Tooltip.module.css'

/* -------------------------------- Provider -------------------------------- */

export const TooltipProvider = TooltipPrimitive.Provider

/* -------------------------------- Tooltip -------------------------------- */

export interface TooltipProps {
  content: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  delayDuration?: number
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
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
