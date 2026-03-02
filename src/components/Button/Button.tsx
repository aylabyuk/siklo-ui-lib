import { Slot, Slottable } from '@radix-ui/react-slot'

import styles from './Button.module.css'

/** A versatile button component built on Radix Slot for polymorphic rendering. */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The visual style of the button. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  /** The size of the button. */
  size?: 'sm' | 'md' | 'lg'
  /** Shows a spinner and disables interactions while preserving button width. */
  loading?: boolean
  /** Icon element rendered before the button label. */
  iconLeft?: React.ReactNode
  /** Icon element rendered after the button label. */
  iconRight?: React.ReactNode
  /** Merges props onto the child element instead of rendering a `<button>`. Useful for rendering as an anchor or router link. */
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  asChild = false,
  children,
  className,
  ref,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'
  const isDisabled = disabled || loading

  return (
    <Comp
      ref={ref}
      className={`${styles.button} ${className ?? ''}`}
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {!loading && iconLeft && (
        <span className={styles.icon} aria-hidden="true">
          {iconLeft}
        </span>
      )}
      <Slottable>{children}</Slottable>
      {!loading && iconRight && (
        <span className={styles.icon} aria-hidden="true">
          {iconRight}
        </span>
      )}
    </Comp>
  )
}
