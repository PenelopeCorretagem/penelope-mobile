import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import Alert from '@shared/components/feedback/Alert'
import AdvertisementCard from '@institutional/components/AdvertisementCard/AdvertisementCardView'
import PropertiesCarousel from '@institutional/components/PropertiesCarousel/PropertiesCarouselView'
import PropertiesFilter from '@institutional/components/PropertiesFilter/PropertiesFilterView'
import Button from '@shared/components/ui/Button'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import Section from '@shared/components/layout/Section'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import Footer from '@shared/components/layout/Footer'
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
      <Section style={styles.filtersSection}>
        <PropertiesFilter
          cities={availableCities}
          filters={filters}
          onChange={updateFilters}
          onClear={clearFilters}
          regions={availableRegions}
        />
        <Heading level={3}>
          {totalResults} {totalResults === 1 ? 'propriedade encontrada' : 'propriedades encontradas'}
        </Heading>
      </Section>

      {totalResults === 0 ? (
        <Section style={styles.state}>
          <Text>Nenhuma propriedade encontrada com os filtros aplicados.</Text>
          <Button onPress={clearFilters}>Limpar filtros</Button>
        </Section>
      ) : (
        <View>
          <Section><PropertiesCarousel advertisements={groups.launch} title="Lançamentos" /></Section>
          <Section style={filters.type === 'DISPONIVEL' ? undefined : styles.availableSection}>
            <PropertiesCarousel advertisements={groups.available} title="Disponíveis" />
          </Section>
          <Section><PropertiesCarousel advertisements={groups.underConstruction} title="Em Obras" /></Section>
        </View>
      )}
      <Footer />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  filtersSection: {
    gap: spacing.lg,
  },
  availableSection: {
    backgroundColor: colors.surface,
  },
  state: {
    alignItems: 'flex-start',
    gap: spacing.md,
    justifyContent: 'center',
    minHeight: 240,
  },
})