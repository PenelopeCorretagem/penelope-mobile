import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import { FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native'
import { ESTATE_TYPES } from '@constant/estateTypes'
import { APP_ROUTES } from '@constant/routes'
import { Advertisement } from '@dtos/Advertisement'
import Button from '@shared/components/ui/Button'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import { useFavorites } from '@shared/context/FavoritesContext'
import { colors, spacing } from '@shared/styles/style'
import { getAdvertisementImageUrls } from '@properties/pages/Properties/PropertiesModel'

type AdvertisementCardProps = {
  advertisement: Advertisement
  width?: number
}

export default function AdvertisementCardView({ advertisement, width }: AdvertisementCardProps) {
  const { estate } = advertisement
  const { isFavorite, toggleFavorite } = useFavorites()
  const { width: windowWidth } = useWindowDimensions()
  const cardWidth = width ?? windowWidth - spacing.md * 2
  const imageUrls = getAdvertisementImageUrls(advertisement)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
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
      style={[styles.card, { width: cardWidth }]}
    >
      <View style={styles.imageContainer}>
        <FlatList
          data={imageUrls}
          decelerationRate="fast"
          horizontal
          keyExtractor={(url, index) => `${url}-${index}`}
          nestedScrollEnabled
          onScroll={({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
            const pageWidth = nativeEvent.layoutMeasurement.width
            if (pageWidth > 0) setActiveImageIndex(Math.round(nativeEvent.contentOffset.x / pageWidth))
          }}
          pagingEnabled
          renderItem={({ item: imageUrl }) => (
            <Image
              accessibilityLabel={`Imagem do imóvel ${estate.title ?? ''}`}
              source={{ uri: imageUrl }}
              style={[styles.cover, { width: cardWidth }]}
            />
          )}
          scrollEnabled={imageUrls.length > 1}
          showsHorizontalScrollIndicator={false}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isSaved ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          onPress={() => toggleFavorite(advertisement.id)}
          style={styles.favoriteButton}
        >
          <Ionicons name={isSaved ? 'heart' : 'heart-outline'} size={18} color={colors.primary} />
        </Pressable>

        <Text style={[styles.category, { backgroundColor: categoryColor, color: colors.background }]}>
          {estate.type.friendlyName ?? typeConfig?.cardLabel ?? estate.type.key}
        </Text>

        {imageUrls.length > 1 ? (
          <View accessibilityLabel={`${imageUrls.length} imagens`} style={styles.pagination}>
            {imageUrls.map((imageUrl, index) => <View key={`${imageUrl}-dot-${index}`} style={[styles.dot, index === activeImageIndex && styles.activeDot]} />)}
          </View>
        ) : null}
      </View>

      <View style={styles.content}>
        <Heading level={4} style={styles.title}>{estate.title ?? 'Imóvel sem título'}</Heading>
        <Text style={styles.city}>{estate.address?.city ?? 'Cidade não informada'}</Text>
        <Text style={styles.detail}>{detail}</Text>

        {amenities.length > 0 ? (
          <View style={styles.amenities}>
            {amenities.slice(0, 3).map((amenity, index) => (
              <Text key={amenity.id ?? `${amenity.description ?? 'amenity'}-${index}`} style={styles.amenity}>
                {amenity.description || 'Diferencial'}
              </Text>
            ))}
          </View>
        ) : null}

        <Button onPress={() => router.push(`${APP_ROUTES.detalhes}/${advertisement.id}`)} style={styles.learnMoreButton}>Saiba Mais</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.md,
    marginHorizontal: spacing.md,
    overflow: 'hidden',
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
  },
  cover: {
    aspectRatio: 1,
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
    borderRadius: 6,
    fontSize: 11,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    position: 'absolute',
    left: 12,
    bottom: 12,
    width: 'auto',
  },
  pagination: {
    alignItems: 'center',
    bottom: spacing.sm,
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  dot: {
    backgroundColor: colors.primaryLight,
    borderRadius: 4,
    height: 6,
    opacity: 0.9,
    width: 6,
  },
  activeDot: {
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
  },
  city: {
    color: colors.mutedText,
    fontSize: 13,
    marginBottom: 2,
  },
  detail: {
    color: colors.mutedText,
    fontSize: 12,
    marginBottom: spacing.sm,
  },
  amenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amenity: {
    backgroundColor: colors.surface,
    borderRadius: 6,
    fontSize: 12,
    marginRight: spacing.sm,
    marginBottom: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  learnMoreButton: {
    backgroundColor: colors.primary,
  },
})