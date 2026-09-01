import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import Alert from '@shared/components/feedback/Alert'
import AdvertisementsCarousel from 'src/modules/properties/components/AdvertisementsCarousel'
import Button from '@shared/components/ui/Button'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import Section from '@shared/components/layout/Section'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import { usePropertiesViewModel } from './usePropertiesViewModel'

export default function PropertiesView() {
  const {
    availableCities,
    availableRegions,
    clearFilters,
    error,
    filters,
    groups,
    isLoading,
    retry,
    totalResults,
    updateFilters,
  } = usePropertiesViewModel()

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
    <ScrollView style={sharedStyles.screen}>
      {totalResults === 0 ? (
        <Section style={styles.state}>
          <Text>Nenhuma propriedade encontrada com os filtros aplicados.</Text>
          <Button onPress={clearFilters}>Limpar busca e filtros</Button>
        </Section>
      ) : (
        <View>
          <Section><AdvertisementsCarousel advertisements={groups.launch} title="Lançamentos" /></Section>
          <Section style={filters.type === 'DISPONIVEL' ? undefined : styles.availableSection}>
            <AdvertisementsCarousel advertisements={groups.available} title="Disponíveis" />
          </Section>
          <Section><AdvertisementsCarousel advertisements={groups.underConstruction} title="Em Obras" /></Section>
        </View>
      )}
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  availableSection: {
    backgroundColor: colors.surface,
  },
  state: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    height: '100%',
  },
})