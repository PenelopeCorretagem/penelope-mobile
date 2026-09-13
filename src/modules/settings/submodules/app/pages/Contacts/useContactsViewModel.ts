import { useMemo, useCallback } from 'react'
import { ContactsModel } from './ContactsModel'
import type { ContactItem } from '@shared/types/contact'

export function useContactsViewModel() {

  const validateFormData = useCallback((data: Record<string, string>) => {
    return ContactsModel.validateFormData(data)
  }, [])

  return {
    validateFormData,
  }
}
