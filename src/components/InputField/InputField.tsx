import { useId } from 'react'

import styles from './InputField.module.css'

export interface InputFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'id'
> {
  /** Visible label text */
  label: string
  /** Optional helper text shown below the input */
  helperText?: string
  /** Error message — replaces helper text and marks the input as invalid */
  error?: string
  /** Explicit id — auto-generated if omitted */
  id?: string
  ref?: React.Ref<HTMLInputElement>
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  helperText,
  error,
  id: idProp,
  required,
  disabled,
  className,
  ref,
  ...inputProps
}) => {
  const autoId = useId()
  const id = idProp ?? autoId
  const helperId = helperText && !error ? `${id}-helper` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div
      className={`${styles.field} ${className ?? ''}`}
      data-disabled={disabled || undefined}
      data-error={error ? '' : undefined}
    >
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        )}
      </label>

      <input
        ref={ref}
        id={id}
        className={styles.input}
        disabled={disabled}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...inputProps}
      />

      {error && (
        <p className={styles.error} id={errorId} role="alert">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className={styles.helper} id={helperId}>
          {helperText}
        </p>
      )}
    </div>
  )
}
