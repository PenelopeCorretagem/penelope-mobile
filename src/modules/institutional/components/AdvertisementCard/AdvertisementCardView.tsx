import { Image, StyleSheet, View } from 'react-native'
import { ESTATE_TYPES } from '@constant/estateTypes'
import { Advertisement } from '@dtos/Advertisement'
import Button from '@shared/components/ui/Button'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import { colors, spacing } from '@shared/styles/style'
import { getCoverImageUrl } from '@institutional/pages/Properties/PropertiesModel'

type AdvertisementCardProps = {
  advertisement: Advertisement
}

export default function AdvertisementCardView({ advertisement }: AdvertisementCardProps) {
  const { estate } = advertisement
  const coverImageUrl = getCoverImageUrl(advertisement)
  const amenities = estate.amenities?.slice(0, 4) ?? []
  const detail = `${estate.area ?? '?'} m² - ${estate.numberOfRooms ?? '?'} dormitórios`
  const typeConfig = Object.values(ESTATE_TYPES).find(({ domainKey }) => domainKey === estate.type.key)
  const categoryColor = typeConfig?.cardColor === 'secondary'
    ? colors.secondary
    : typeConfig?.cardColor === 'secondaryLight'
      ? colors.secondaryLight
      : colors.primary

  return (
    <View style={styles.card} accessibilityRole="summary">
      {coverImageUrl ? (
        <Image
          accessibilityLabel={`Imagem do imóvel ${estate.title ?? ''}`}
          source={{ uri: coverImageUrl }}
          style={styles.cover}
        />
      ) : null}
      <Text style={[styles.category, { color: categoryColor }]}>
        {typeConfig?.cardLabel ?? estate.type.friendlyName ?? estate.type.key}
      </Text>
      <Heading level={4} style={styles.title}>{estate.title ?? 'Título não disponível'}</Heading>
      <Text style={styles.city}>{estate.address?.city ?? 'Cidade não informada'}</Text>
      <Text>{detail}</Text>
      {amenities.length > 0 ? (
        <View style={styles.amenities}>
          {amenities.map((amenity, index) => (
            <Text key={amenity.id ?? `${amenity.description ?? 'amenity'}-${index}`} style={styles.amenity}>
              {amenity.description || 'Diferencial'}
            </Text>
          ))}
        </View>
      ) : null}
      <Button disabled style={styles.disabledAction}>Saiba Mais</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 6,
    gap: spacing.sm,
    marginRight: spacing.md,
    padding: spacing.md,
    width: 280,
  },
  cover: {
    borderRadius: 6,
    height: 180,
    width: '100%',
  },
  category: {
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    marginTop: spacing.sm,
  },
  city: {
    color: colors.mutedText,
  },
  amenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  amenity: {
    backgroundColor: colors.surface,
    borderRadius: 6,
    fontSize: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  disabledAction: {
    alignSelf: 'stretch',
    opacity: 0.55,
  },
})