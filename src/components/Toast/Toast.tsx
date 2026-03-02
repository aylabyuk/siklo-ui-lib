import { createContext, useCallback, useContext, useState } from 'react'

import * as ToastPrimitive from '@radix-ui/react-toast'

import styles from './Toast.module.css'

/* --------------------------------- Types --------------------------------- */

export type ToastVariant = 'default' | 'success' | 'error' | 'warning'

export interface ToastData {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

type ToastInput = Omit<ToastData, 'id'>

/* -------------------------------- Context -------------------------------- */

interface ToastContextValue {
  toast: (input: ToastInput) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

/* ---------------------------------- Hook ---------------------------------- */

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

/* -------------------------------- Provider -------------------------------- */

let toastCount = 0

export interface ToastProviderProps {
  children: React.ReactNode
  duration?: number
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  duration = 5000,
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const toast = useCallback((input: ToastInput) => {
    const id = `toast-${++toastCount}`
    setToasts((prev) => [...prev, { ...input, id }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastPrimitive.Provider duration={duration}>
        {children}
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
        <ToastPrimitive.Viewport className={styles.viewport} />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  )
}

/* ------------------------------- Toast Item ------------------------------- */

interface ToastItemProps {
  toast: ToastData
  onClose: () => void
}

const ToastItem: React.FC<ToastItemProps> = ({ toast: t, onClose }) => {
  return (
    <ToastPrimitive.Root
      className={styles.root}
      data-variant={t.variant ?? 'default'}
      duration={t.duration}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <div className={styles.body}>
        <ToastPrimitive.Title className={styles.title}>
          {t.title}
        </ToastPrimitive.Title>
        {t.description && (
          <ToastPrimitive.Description className={styles.description}>
            {t.description}
          </ToastPrimitive.Description>
        )}
      </div>
      <div className={styles.actions}>
        {t.action && (
          <ToastPrimitive.Action
            className={styles.action}
            altText={t.action.label}
            onClick={t.action.onClick}
          >
            {t.action.label}
          </ToastPrimitive.Action>
        )}
        <ToastPrimitive.Close className={styles.close} aria-label="Close">
          <CloseIcon />
        </ToastPrimitive.Close>
      </div>
    </ToastPrimitive.Root>
  )
}

/* --------------------------------- Icons --------------------------------- */

const CloseIcon: React.FC = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 4L4 12M4 4L12 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
