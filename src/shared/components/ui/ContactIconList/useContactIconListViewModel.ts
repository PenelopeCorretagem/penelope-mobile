import { useMemo } from 'react'
import { ContactIconListModel } from './ContactIconListModel'
import type { ContactItem } from '@dtos/Contact'

type UseContactIconListViewModelProps = {
  contacts?: ContactItem[]
  layout?: 'horizontal' | 'vertical'
  iconSize?: 'small' | 'medium' | 'large'
}

export function useContactIconListViewModel({
  contacts = ContactIconListModel.getDefaultContacts(),
  layout = 'horizontal',
  iconSize = 'medium',
}: UseContactIconListViewModelProps) {
  const validation = useMemo(() => {
    return ContactIconListModel.validateContactListProps(contacts)
  }, [contacts])

  const validContacts = useMemo(() => {
    return contacts.filter(contact => contact.id && contact.href)
  }, [contacts])

  return {
    validation,
    validContacts,
    layout,
    iconSize,
  }
}
