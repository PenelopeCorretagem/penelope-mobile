import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react'

type AlertDismissalContextValue = {
  isDismissed: (persistenceKey: string) => boolean
  dismiss: (persistenceKey: string) => void
}

const defaultValue: AlertDismissalContextValue = {
  isDismissed: () => false,
  dismiss: () => undefined,
}

const AlertDismissalContext = createContext<AlertDismissalContextValue>(defaultValue)

export function AlertDismissalProvider({ children }: PropsWithChildren) {
  const [dismissedKeys, setDismissedKeys] = useState<Set<string>>(() => new Set())

  const isDismissed = useCallback(
    (persistenceKey: string) => dismissedKeys.has(persistenceKey),
    [dismissedKeys],
  )

  const dismiss = useCallback((persistenceKey: string) => {
    setDismissedKeys((current) => {
      if (current.has(persistenceKey)) return current

      const next = new Set(current)
      next.add(persistenceKey)
      return next
    })
  }, [])

  const value = useMemo(() => ({ isDismissed, dismiss }), [dismiss, isDismissed])

  return (
    <AlertDismissalContext.Provider value={value}>
      {children}
    </AlertDismissalContext.Provider>
  )
}

export function useAlertDismissal() {
  return useContext(AlertDismissalContext)
}
