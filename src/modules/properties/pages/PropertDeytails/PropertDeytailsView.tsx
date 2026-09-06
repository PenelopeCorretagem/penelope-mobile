import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from 'react-native'
import Alert from '@shared/components/feedback/Alert'
import Button from '@shared/components/ui/Button'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import Section from '@shared/components/layout/Section'
import { getAdvertisementImageUrls } from '../Properties/PropertiesModel'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import { formatPrice, getLocationLabel } from './PropertDeytailsModel'
import { usePropertDeytailsViewModel } from './usePropertDeytailsViewModel'

export default function PropertDeytailsView() {
  const { advertisement, error, isLoading, retry } = usePropertDeytailsViewModel()

  if (isLoading) {
    return (
      <Section style={styles.state}>
        <ActivityIndicator color={colors.primary} size="large" />
        <Text>Carregando detalhes do imóvel...</Text>
      </Section>
    )
  }

  if (error || !advertisement) {
    return (
      <Section style={styles.state}>
        <Alert message={error ?? 'Imóvel não encontrado.'} />
        {error?.includes('Tente novamente') ? <Button onPress={retry}>Tentar novamente</Button> : null}
      </Section>
    )
  }

  const { estate } = advertisement
  const imageUrl = getAdvertisementImageUrls(advertisement)[0]
  const price = formatPrice(advertisement.price)
  const details = [
    ['Tipo', estate.type?.friendlyName ?? estate.type?.key],
    ['Área', estate.area !== undefined ? `${estate.area} m²` : undefined],
    ['Dormitórios', estate.numberOfRooms !== undefined ? String(estate.numberOfRooms) : undefined],
  ].filter((detail): detail is [string, string] => Boolean(detail[1]))

  return (
    <ScrollView contentContainerStyle={styles.content} style={sharedStyles.screen}>
      {imageUrl ? <Image accessibilityLabel={`Imagem do imóvel ${estate.title ?? ''}`} source={{ uri: imageUrl }} style={styles.image} /> : null}
      <Section style={styles.section}>
        <Heading level={1} style={styles.title}>{estate.title ?? 'Imóvel sem título'}</Heading>
        <Text style={styles.location}>{getLocationLabel(advertisement)}</Text>
        {price ? <Text style={styles.price}>{price}</Text> : null}
      </Section>

      <Section style={styles.section}>
        <Heading level={3} style={styles.sectionTitle}>Informações do imóvel</Heading>
        <View style={styles.details}>
          {details.map(([label, value]) => (
            <View key={label} style={styles.detail}>
              <Text style={styles.detailLabel}>{label}</Text>
              <Text style={styles.detailValue}>{value}</Text>
            </View>
          ))}
        </View>
      </Section>

      {estate.description ? (
        <Section style={styles.section}>
          <Heading level={3} style={styles.sectionTitle}>Descrição</Heading>
          <Text style={styles.body}>{estate.description}</Text>
        </Section>
      ) : null}

      {estate.amenities && estate.amenities.length > 0 ? (
        <Section style={styles.section}>
          <Heading level={3} style={styles.sectionTitle}>Diferenciais</Heading>
          <View style={styles.amenities}>
            {estate.amenities.map((amenity, index) => (
              <Text key={amenity.id ?? `${amenity.description ?? 'amenity'}-${index}`} style={styles.amenity}>
                {amenity.description || 'Diferencial'}
              </Text>
            ))}
          </View>
        </Section>
      ) : null}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: { paddingBottom: spacing.xl },
  image: { aspectRatio: 1.3, backgroundColor: colors.surface, width: '100%' },
  section: { alignItems: 'stretch', paddingHorizontal: spacing.lg, paddingVertical: spacing.lg },
  title: { textAlign: 'left' },
  location: { color: colors.mutedText, marginTop: spacing.sm, textAlign: 'left' },
  price: { color: colors.primary, fontSize: 20, fontWeight: '700', marginTop: spacing.md, textAlign: 'left' },
  sectionTitle: { fontSize: 20, marginBottom: spacing.md, textAlign: 'left' },
  details: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  detail: { minWidth: '28%' },
  detailLabel: { color: colors.mutedText, fontSize: 13, textAlign: 'left' },
  detailValue: { fontWeight: '700', marginTop: 2, textAlign: 'left' },
  body: { textAlign: 'left' },
  amenities: { gap: spacing.sm },
  amenity: { backgroundColor: colors.white, borderRadius: 6, padding: spacing.sm, textAlign: 'left' },
  state: { alignItems: 'center', flex: 1, gap: spacing.md, justifyContent: 'center' },
})