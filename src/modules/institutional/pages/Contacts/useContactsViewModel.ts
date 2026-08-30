import { useMemo, useCallback } from 'react'
import { ContactIconListModel } from '@shared/components/ui/ContactIconList/ContactIconListModel'
import { ContactsModel } from './ContactsModel'
import type { ContactItem } from '@dtos/Contact'

export function useContactsViewModel() {
  const contactItems: ContactItem[] = useMemo(() => {
    return ContactIconListModel.getDefaultContacts()
  }, [])

  const validateFormData = useCallback((data: Record<string, string>) => {
    return ContactsModel.validateFormData(data)
  }, [])

  return {
    contactItems,
    validateFormData,
  }
}
