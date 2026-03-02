import * as SelectPrimitive from '@radix-ui/react-select'

import styles from './Select.module.css'

/* ---------------------------------- Root ---------------------------------- */

export const Select = SelectPrimitive.Root

/* --------------------------------- Value --------------------------------- */

export const SelectValue = SelectPrimitive.Value

/* --------------------------------- Group --------------------------------- */

export const SelectGroup = SelectPrimitive.Group

/* -------------------------------- Trigger -------------------------------- */

export interface SelectTriggerProps extends React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
> {
  ref?: React.Ref<HTMLButtonElement>
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
  className,
  children,
  ref,
  ...props
}) => {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={`${styles.trigger} ${className ?? ''}`}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className={styles.icon}>
        <ChevronDownIcon />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

/* -------------------------------- Content -------------------------------- */

export interface SelectContentProps extends React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Content
> {
  ref?: React.Ref<HTMLDivElement>
}

export const SelectContent: React.FC<SelectContentProps> = ({
  className,
  children,
  position = 'popper',
  ref,
  ...props
}) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={`${styles.content} ${className ?? ''}`}
        position={position}
        sideOffset={4}
        {...props}
      >
        <SelectPrimitive.Viewport className={styles.viewport}>
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

/* --------------------------------- Item --------------------------------- */

export interface SelectItemProps extends React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Item
> {
  ref?: React.Ref<HTMLDivElement>
}

export const SelectItem: React.FC<SelectItemProps> = ({
  className,
  children,
  ref,
  ...props
}) => {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={`${styles.item} ${className ?? ''}`}
      {...props}
    >
      <SelectPrimitive.ItemIndicator className={styles.itemIndicator}>
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

/* --------------------------------- Label --------------------------------- */

export const SelectLabel: React.FC<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> & {
    ref?: React.Ref<HTMLDivElement>
  }
> = ({ className, ref, ...props }) => {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={`${styles.label} ${className ?? ''}`}
      {...props}
    />
  )
}

/* --------------------------------- Icons --------------------------------- */

const ChevronDownIcon: React.FC = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const CheckIcon: React.FC = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13 4L6 12L3 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
