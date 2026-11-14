import { useRef } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { useScrollToTop } from 'expo-router'
import type { Advertisement } from '@properties/types/advertisement'
import Alert from '@shared/components/feedback/Alert'
import Button from '@shared/components/ui/Button'
import Text from '@shared/components/ui/Text'
import Section from '@shared/components/layout/Section'
import AdvertisementCard from '@properties/components/AdvertisementCard'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import { usePropertiesViewModel } from './usePropertiesViewModel'
import { useTranslation } from 'react-i18next'

export default function PropertiesView({ favoritesOnly = false }: { favoritesOnly?: boolean }) {
  const listRef = useRef<FlatList<Advertisement>>(null)
  useScrollToTop(listRef)
  const { t } = useTranslation()

  const {
    advertisements,
    clearFilters,
    error,
    hasMoreAdvertisements,
    isLoading,
    loadMoreAdvertisements,
    retry,
    totalResults,
  } = usePropertiesViewModel({ favoritesOnly })

  if (isLoading) {
    return (
      <Section style={styles.state}>
        <ActivityIndicator color={colors.primary} size="large" />
        <Text>{t('properties.loading')}</Text>
      </Section>
    )
  }

  if (error) {
    return (
      <Section style={styles.state}>
        <Alert message={t(error)} />
        <Button onPress={retry}>{t('common.retry')}</Button>
      </Section>
    )
  }

  return (
    totalResults === 0 ? (
      <Section style={styles.state}>
        <Text>{t('properties.empty')}</Text>
        <Button onPress={clearFilters}>{t('properties.clearSearch')}</Button>
      </Section>
    ) : (
      <FlatList
        ref={listRef}
        contentContainerStyle={styles.feedContent}
        data={advertisements}
        keyExtractor={(advertisement) => String(advertisement.id)}
        onEndReached={loadMoreAdvertisements}
        onEndReachedThreshold={0.7}
        renderItem={({ item }) => <AdvertisementCard advertisement={item} />}
        style={sharedStyles.screen}
        ListFooterComponent={hasMoreAdvertisements ? <ActivityIndicator color={colors.primary} style={styles.footer} /> : null}
      />
    )
  )
}

const styles = StyleSheet.create({
  feedContent: {
    paddingBottom: spacing.md,
    paddingTop: spacing.md,
  },
  footer: {
    paddingBottom: spacing.md,
  },
  state: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    height: '100%',
  },
})