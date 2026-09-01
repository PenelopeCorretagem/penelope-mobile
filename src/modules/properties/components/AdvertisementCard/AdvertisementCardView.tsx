import { Ionicons } from '@expo/vector-icons'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { ESTATE_TYPES } from '@constant/estateTypes'
import { Advertisement } from '@dtos/Advertisement'
import Button from '@shared/components/ui/Button'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import { useFavorites } from '@shared/context/FavoritesContext'
import { colors, spacing } from '@shared/styles/style'
import { getCoverImageUrl } from '@properties/pages/Properties/PropertiesModel'

type AdvertisementCardProps = {
  advertisement: Advertisement
  width?: number
}

export default function AdvertisementCardView({ advertisement, width }: AdvertisementCardProps) {
  const { estate } = advertisement
  const { isFavorite, toggleFavorite } = useFavorites()
  const coverImageUrl = getCoverImageUrl(advertisement)
  const amenities = estate.amenities?.slice(0, 4) ?? []
  const detail = `${estate.area ?? '?'} m² - ${estate.numberOfRooms ?? '?'} dormitórios`
  const typeConfig = Object.values(ESTATE_TYPES).find(({ domainKey }) => domainKey === estate.type.key)
  const categoryColor = typeConfig?.cardColor === 'secondary'
    ? colors.secondary
    : typeConfig?.cardColor === 'secondaryLight'
      ? colors.secondaryLight
      : colors.primary
  const isSaved = isFavorite(advertisement.id)

  return (
    <View
      accessibilityRole="summary"
      style={[styles.card, width ? { marginHorizontal: spacing.md, width } : undefined]}
    >
      <View style={styles.imageContainer}>
        {coverImageUrl ? (
          <Image
            accessibilityLabel={`Imagem do imóvel ${estate.title ?? ''}`}
            source={{ uri: coverImageUrl }}
            style={styles.cover}
          />
        ) : null}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isSaved ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          onPress={() => toggleFavorite(advertisement.id)}
          style={styles.favoriteButton}
        >
          <Ionicons name={isSaved ? 'heart' : 'heart-outline'} size={18} color={colors.primary} />
        </Pressable>

        <Text style={[styles.category, { backgroundColor: categoryColor, color: colors.background }]}>
          {typeConfig?.cardLabel ?? estate.type.friendlyName ?? estate.type.key}
        </Text>
      </View>

      <View style={styles.content}>
        <Heading level={4} style={styles.title}>{estate.title ?? 'Título não disponível'}</Heading>
        <Text style={styles.city}>{estate.address?.city ?? 'Cidade não informada'}</Text>
        <Text style={styles.detail}>{detail}</Text>

        {amenities.length > 0 ? (
          <View style={styles.amenities}>
            {amenities.map((amenity, index) => (
              <Text key={amenity.id ?? `${amenity.description ?? 'amenity'}-${index}`} style={styles.amenity}>
                {amenity.description || 'Diferencial'}
              </Text>
            ))}
          </View>
        ) : null}

        <Button onPress={() => {}} style = {styles.learnMoreButton}>Saiba Mais</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    marginRight: spacing.md,
    overflow: 'hidden',
    width: 280,
  },
  imageContainer: {
    position: 'relative',
  },
  cover: {
    height: 180,
    width: '100%',
  },
  favoriteButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 999,
    height: 34,
    justifyContent: 'center',
    position: 'absolute',
    right: 12,
    top: 12,
    width: 34,
  },
  content: {
    padding: spacing.md,
  },
  category: {
    backgroundColor: '#f9edf5',
    borderRadius: 6,
    fontSize: 11,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    position: 'absolute',
    left: 12,
    bottom: 12,
  },
  title: {
    marginBottom: spacing.sm,
  },
  city: {
    color: colors.mutedText,
    marginBottom: 4,
  },
  detail: {
    color: colors.mutedText,
    marginBottom: spacing.sm,
  },
  amenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amenity: {
    backgroundColor: colors.surface,
    borderRadius: 6,
    fontSize: 12,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  learnMoreButton: {
    backgroundColor: colors.primary,
  },
})