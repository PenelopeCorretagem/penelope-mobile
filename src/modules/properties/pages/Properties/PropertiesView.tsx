import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import Alert from '@shared/components/feedback/Alert'
import Button from '@shared/components/ui/Button'
import Text from '@shared/components/ui/Text'
import Section from '@shared/components/layout/Section'
import AdvertisementCard from '@properties/components/AdvertisementCard'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import { usePropertiesViewModel } from './usePropertiesViewModel'

export default function PropertiesView({ favoritesOnly = false }: { favoritesOnly?: boolean }) {
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
        <Text>Carregando propriedades...</Text>
      </Section>
    )
  }

  if (error) {
    return (
      <Section style={styles.state}>
        <Alert message={error} />
        <Button onPress={retry}>Tentar novamente</Button>
      </Section>
    )
  }

  return (
    totalResults === 0 ? (
      <Section style={styles.state}>
        <Text>Nenhuma propriedade encontrada com os filtros aplicados.</Text>
        <Button onPress={clearFilters}>Limpar busca e filtros</Button>
      </Section>
    ) : (
      <FlatList
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
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
  },
  footer: {
    paddingVertical: spacing.md,
  },
  state: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    height: '100%',
  },
})