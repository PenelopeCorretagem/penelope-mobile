import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import { Alert, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native'
import { PROPERTY_TYPES } from '@constant/propertyTypes'
import { APP_ROUTES } from '@shared/constants/routes'
import type { Advertisement } from '@properties/types/advertisement'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import { useFavorites } from '@shared/context/FavoritesContext'
import { colors, spacing } from '@shared/styles/style'
import { getAdvertisementCardImageUrls } from '@properties/pages/Properties/PropertiesModel'
import { useTranslation } from 'react-i18next'

type AdvertisementCardProps = {
  advertisement: Advertisement
  width?: number
}

export default function AdvertisementCardView({ advertisement, width }: AdvertisementCardProps) {
  const { property } = advertisement
  const { t } = useTranslation()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { width: windowWidth } = useWindowDimensions()
  const cardWidth = width ?? windowWidth - spacing.md * 2
  const imageUrls = getAdvertisementCardImageUrls(advertisement)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isFavoriteUpdating, setIsFavoriteUpdating] = useState(false)
  const amenities = property.amenities?.slice(0, 4) ?? []
  const detail = `${property.area ?? '?'} m² - ${property.numberOfRooms ?? '?'} dormitórios`
  const typeConfig = property.type
    ? Object.values(PROPERTY_TYPES).find(({ domainKey }) => domainKey === property.type.key)
    : undefined
  const categoryColor = typeConfig?.cardColor === 'secondary'
    ? colors.secondary
    : typeConfig?.cardColor === 'secondaryLight'
      ? colors.secondaryLight
      : colors.primary
  const isSaved = isFavorite(advertisement.id)

  const handleToggleFavorite = async () => {
    setIsFavoriteUpdating(true)

    try {
      await toggleFavorite(advertisement.id)
    } catch (error) {
      console.error('Falha ao atualizar favorito', error)
      Alert.alert(t('errors.favorite'), t('errors.tryAgain'))
    } finally {
      setIsFavoriteUpdating(false)
    }
  }

  return (
    <View style={[styles.card, { width: cardWidth }]}>
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
              accessibilityLabel={t('properties.propertyImage', { title: property.title ?? '' })}
              source={{ uri: imageUrl }}
              style={[styles.cover, { width: cardWidth }]}
            />
          )}
          scrollEnabled={imageUrls.length > 1}
          showsHorizontalScrollIndicator={false}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isSaved ? t('properties.removeFavorite') : t('properties.addFavorite')}
          disabled={isFavoriteUpdating}
          onStartShouldSetResponder={() => true}
          onPress={() => void handleToggleFavorite()}
          style={styles.favoriteButton}
        >
          <Ionicons name={isSaved ? 'heart' : 'heart-outline'} size={18} color={colors.primary} />
        </Pressable>

        <Text style={[styles.category, { backgroundColor: categoryColor, color: colors.background }]}>
          {property.type?.friendlyName ?? t('properties.property')}
        </Text>

        {imageUrls.length > 1 ? (
          <View accessibilityLabel={t('properties.images', { count: imageUrls.length })} style={styles.pagination}>
            {imageUrls.map((imageUrl, index) => <View key={`${imageUrl}-dot-${index}`} style={[styles.dot, index === activeImageIndex && styles.activeDot]} />)}
          </View>
        ) : null}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('properties.openDetails', { title: property.title ?? t('properties.property') })}
        onPress={() => router.push(`${APP_ROUTES.detalhes}/${advertisement.id}`)}
        style={styles.content}
      >
        <Heading level={4} style={styles.title}>{property.title ?? t('properties.untitled')}</Heading>
        <Text style={styles.city}>{property.address?.city ?? t('properties.unknownCity')}</Text>
        {advertisement.distanceKm !== undefined ? (
          <Text style={styles.distance}>{advertisement.distanceKm < 1 ? t('properties.lessThanKm') : t('properties.kmAway', { distance: advertisement.distanceKm.toFixed(1) })}</Text>
        ) : null}
        <Text style={styles.detail}>{t('properties.bedrooms', { area: property.area ?? '?', rooms: property.numberOfRooms ?? '?' })}</Text>

        {amenities.length > 0 ? (
          <View style={styles.amenities}>
            {amenities.slice(0, 3).map((amenity, index) => (
              <Text key={amenity.id ?? `${amenity.description ?? 'amenity'}-${index}`} style={styles.amenity}>
                {amenity.description || t('properties.amenity')}
              </Text>
            ))}
          </View>
        ) : null}

        <Text style={styles.learnMoreButton}>{t('properties.learnMore')}</Text>
      </Pressable>
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
    fontSize: 14,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
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
  distance: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: '700',
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
    borderRadius: 6,
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    textAlign: 'center',
  },
})