import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Advertisement } from '@dtos/Advertisement'
import { getCoverImageUrl } from '@properties/pages/Properties/PropertiesModel'
import Button from '@shared/components/ui/Button'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import { useFavorites } from '@shared/context/FavoritesContext'
import { colors, spacing } from '@shared/styles/style'
import { APP_ROUTES } from "@constant/routes";

type FeaturedAdvertisementCardProps = {
  advertisement: Advertisement
}

export default function FeaturedAdvertisementCard({ advertisement }: FeaturedAdvertisementCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const featuredImage = getCoverImageUrl(advertisement)
  const isSaved = isFavorite(advertisement.id)

  return (
    <View style={styles.featuredCard}>
      <View style={styles.featuredImageContainer}>
        <Image
          accessibilityLabel={`Imagem principal do imóvel ${advertisement.estate.title ?? ''}`}
          source={{ uri: featuredImage ?? undefined }}
          style={styles.featuredImage}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isSaved ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          style={styles.featuredFavoriteButton}
          onPress={() => toggleFavorite(advertisement.id)}
        >
          <Ionicons
            name={isSaved ? 'heart' : 'heart-outline'}
            size={18}
            color={colors.primary}
          />
        </Pressable>

        <Text style={styles.featuredBadge}>Destaque</Text>
      </View>

      <View style={styles.featuredContent}>
        <Heading level={3} style={styles.featuredTitle}>
          {advertisement.estate.title ?? 'Imóvel em destaque'}
        </Heading>

        <Text style={styles.featuredLocation}>
          {advertisement.estate.address?.city ?? 'Cidade'}
        </Text>

        <Text style={styles.featuredDetail}>
          {`${advertisement.estate.area ?? '?'} m² - ${advertisement.estate.numberOfRooms ?? '?'} dormitórios`}
        </Text>

        <View style={styles.featuredAmenities}>
          {(advertisement.estate.amenities ?? []).slice(0, 4).map((amenity, index) => (
            <Text key={amenity.id ?? `${amenity.description ?? 'amenity'}-${index}`} style={styles.featuredAmenity}>
              {amenity.description || 'Diferencial'}
            </Text>
          ))}
        </View>

        <Button onPress={() => router.push(`${APP_ROUTES.detalhes}/${advertisement.id}`)} style={styles.learnMoreButton}>Ver imóvel</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  featuredCard: {
    backgroundColor: colors.white,
    borderRadius: 0,
    overflow: 'hidden',
    width: '100%',
  },
  featuredImageContainer: {
    position: 'relative',
  },
  featuredImage: {
    height: 200,
    width: '100%',
  },
  featuredFavoriteButton: {
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
  featuredContent: {
    padding: spacing.md,
  },
  featuredBadge: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    color: colors.background,
    fontSize: 11,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    width: 72,
    position: 'absolute',
    left: 12,
    bottom: 12,
  },
  featuredTitle: {
    marginBottom: spacing.sm,
  },
  featuredLocation: {
    color: colors.mutedText,
    marginBottom: 4,
  },
  featuredDetail: {
    color: colors.mutedText,
    marginBottom: spacing.sm,
  },
  featuredAmenities: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  featuredAmenity: {
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
