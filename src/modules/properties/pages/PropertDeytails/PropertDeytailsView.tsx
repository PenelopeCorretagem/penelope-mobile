import { ActivityIndicator, Image, Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Alert from '@shared/components/feedback/Alert'
import Button from '@shared/components/ui/Button'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import Section from '@shared/components/layout/Section'
import { getAdvertisementImageUrls } from '../Properties/PropertiesModel'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import { formatPrice, getLocationLabel } from './PropertDeytailsModel'
import { usePropertDeytailsViewModel } from './usePropertDeytailsViewModel'
import { usePropertDeytailsImagens } from './usePropertDeytailsImagens'

export default function PropertDeytailsView() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const { advertisement, error, isLoading, retry } = usePropertDeytailsViewModel()
  const { imagens, plantas, videos } = usePropertDeytailsImagens()

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
  const imageUrls = getAdvertisementImageUrls(advertisement)
  const imageUrl = imageUrls[0]
  const price = formatPrice(advertisement.price)
  const typeLabel = estate.type?.friendlyName ?? estate.type?.key ?? 'Tipo não informado'
  const dormitoriesLabel = estate.numberOfRooms !== undefined ? `${estate.numberOfRooms} DORMITÓRIO${estate.numberOfRooms !== 1 ? 'S' : ''}` : ''
  const firstThreeAmenities = (estate.amenities ?? []).slice(0, 3)
  const hasCoordinates = estate.address?.latitude && estate.address?.longitude

  return (
    <ScrollView contentContainerStyle={styles.content} style={sharedStyles.screen}>
      {imageUrl ? (
        <View style={styles.imageContainer}>
          <Image accessibilityLabel={`Imagem do imóvel ${estate.title ?? ''}`} source={{ uri: imageUrl }} style={styles.image} />
          {imageUrls.length > 1 ? (
            <View style={styles.imageCountBadge}>
              <Text style={styles.imageCountText}>{imageUrls.length}</Text>
            </View>
          ) : null}
        </View>
      ) : null}

      <Section style={styles.headerSection}>
        <Text style={styles.typeBadge}>{typeLabel}</Text>
        <Heading level={1} style={styles.title}>{estate.title ?? 'Imóvel sem título'}</Heading>
        <Text style={styles.subtitle}>{getLocationLabel(advertisement)}</Text>
        {dormitoriesLabel ? <Text style={styles.subtitle}>{dormitoriesLabel}</Text> : null}
      </Section>

      {firstThreeAmenities.length > 0 ? (
        <View style={styles.amenitiesRow}>
          {firstThreeAmenities.map((amenity, index) => (
            <View key={amenity.id ?? `${amenity.description ?? 'amenity'}-${index}`} style={styles.amenityBadge}>
              <Text style={styles.amenityBadgeText}>{amenity.description || 'Diferencial'}</Text>
            </View>
          ))}
        </View>
      ) : null}

      <Section style={styles.actionButtonsSection}>
        <Pressable
          onPress={() => router.push(`/imoveis/detalhes-imovel/${params.id}/galeria`)}
          style={[styles.actionButtonFull, styles.actionButtonFilled]}
          disabled={imagens.length === 0}
        >
          <Ionicons name="images-outline" size={18} color={colors.white} />
          <Text style={styles.actionButtonTextFilled}>Ver Galeria</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push(`/imoveis/detalhes-imovel/${params.id}/planta`)}
          style={[styles.actionButtonFull, styles.actionButtonFilled]}
          disabled={plantas.length === 0}
        >
          <Ionicons name="document-outline" size={18} color={colors.white} />
          <Text style={styles.actionButtonTextFilled}>Ver Planta</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (videos.length > 0) {
              Linking.openURL(videos[0].url).catch(err => console.error('Failed to open video:', err))
            }
          }}
          style={[styles.actionButtonFull, styles.actionButtonFilled]}
          disabled={videos.length === 0}
        >
          <Ionicons name="videocam" size={18} color={colors.white} />
          <Text style={styles.actionButtonTextFilled}>Assistir Vídeo</Text>
        </Pressable>
      </Section>

      {estate.description ? (
        <Section style={styles.section}>
          <Heading level={3} style={styles.sectionTitle}>DESCRIÇÃO</Heading>
          <Text style={styles.body}>{estate.description}</Text>
        </Section>
      ) : null}

      {estate.amenities && estate.amenities.length > 0 ? (
        <Section style={styles.section}>
          <Heading level={3} style={styles.sectionTitle}>DIFERENCIAIS</Heading>
          <View style={styles.amenitiesGrid}>
            {estate.amenities.map((amenity, index) => (
              <View key={amenity.id ?? `${amenity.description ?? 'amenity'}-${index}`} style={styles.amenityChip}>
                <Text style={styles.amenityText}>{amenity.description || 'Diferencial'}</Text>
              </View>
            ))}
          </View>
        </Section>
      ) : null}

      <Section style={styles.section}>
        <Heading level={3} style={styles.sectionTitle}>QUALIDADES</Heading>
  <View style={styles.qualityItem}>
    <Ionicons
      name="shield"
      size={30}
      color={colors.primary}
    />
    <Text style={styles.body}>
      Segurança
    </Text>
  </View>

  <View style={styles.qualityItem}>
    <Ionicons
      name="leaf"
      size={30}
      color={colors.primary}
    />
    <Text style={styles.body}>
      Área Verde
    </Text>
  </View>

  <View style={styles.qualityItem}>
    <Ionicons
      name="bus"
      size={30}
      color={colors.primary}
    />
    <Text style={styles.body}>
      Transporte
    </Text>
  </View>
      </Section>

      {hasCoordinates ? (
        <Section style={styles.section}>
          <Heading level={3} style={styles.sectionTitle}>LOCALIZAÇÃO</Heading>
        <View style={styles.addressSection}>
          <Ionicons name="location" size={20} color={colors.primary} />
          <Text style={styles.addressText}>{getLocationLabel(advertisement)}</Text>
        </View>
          <Pressable
            onPress={() => {
              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${estate.address!.latitude},${estate.address!.longitude}`
              Linking.openURL(mapsUrl)
            }}
            style={styles.mapContainer}
          >
            <Image
              source={{
                uri: `https://maps.googleapis.com/maps/api/staticmap?center=${estate.address!.latitude},${estate.address!.longitude}&zoom=15&size=400x300&markers=color:red%7C${estate.address!.latitude},${estate.address!.longitude}&key=AIzaSyBa3G7kH2d_VY1xLB_A1zX7qK4J5mQ2pR8`,
              }}
              style={styles.mapImage}
            />
            <View style={styles.mapOverlay}>
              <Ionicons name="map" size={32} color={colors.white} />
              <Text style={styles.mapText}>Ver no Google Maps</Text>
            </View>
          </Pressable>
        </Section>
      ) : null}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: { paddingBottom: spacing.xl },
  imageContainer: { position: 'relative', width: '100%' },
  image: { aspectRatio: 1.3, backgroundColor: colors.surface, width: '100%' },
  imageCountBadge: { backgroundColor: colors.primary, borderRadius: 20, paddingHorizontal: spacing.sm, paddingVertical: 4, position: 'absolute', bottom: spacing.md, right: spacing.md },
  imageCountText: { color: colors.white, fontSize: 12, fontWeight: '700' },
  headerSection: { alignItems: 'flex-start', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  typeBadge: { backgroundColor: colors.primary, color: colors.white, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: spacing.sm, paddingHorizontal: spacing.md, paddingVertical: 6 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: spacing.sm, textAlign: 'left' },
  subtitle: { color: colors.mutedText, fontSize: 13, fontWeight: '500', marginBottom: 4 },
  amenitiesRow: { flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  amenityBadge: { backgroundColor: colors.surface, borderRadius: 4, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  amenityBadgeText: { fontSize: 12, fontWeight: '600', textAlign: 'center' },
  actionButtonsSection: { gap: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  actionButtonFull: { alignItems: 'center', borderRadius: 8, flexDirection: 'row', gap: spacing.md, justifyContent: 'center', paddingVertical: spacing.md, width: '100%' },
  actionButtonFilled: { backgroundColor: colors.primary },
  actionButtonTextFilled: { color: colors.white, fontSize: 14, fontWeight: '600', textAlign: 'center' },
  section: { alignItems: 'stretch', borderTopColor: colors.surface, borderTopWidth: 1, paddingHorizontal: spacing.lg, paddingVertical: spacing.lg },
  sectionTitle: { color: colors.primary, fontSize: 20, fontWeight: '700', letterSpacing: 0.5, marginBottom: spacing.md, textAlign: 'center' },
  amenitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  amenityChip: { backgroundColor: colors.surface, borderRadius: 6, paddingHorizontal: spacing.sm, paddingVertical: 6 },
  amenityText: { fontSize: 12, fontWeight: '600' },
  body: { fontSize: 14, lineHeight: 20, textAlign: 'center' },
  addressSection: { alignItems: 'flex-start', gap: spacing.sm },
  addressText: { fontSize: 13, lineHeight: 18, marginBottom: spacing.md, textAlign: 'center'},
  mapContainer: { borderRadius: 8, overflow: 'hidden', position: 'relative', width: '100%' },
  mapImage: { aspectRatio: 4 / 3, backgroundColor: colors.surface, width: '100%' },
  mapOverlay: { alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)', gap: spacing.sm, justifyContent: 'center', paddingVertical: spacing.lg, position: 'absolute', width: '100%', height: '100%' },
  mapText: { color: colors.white, fontSize: 14, fontWeight: '600' },
  state: { alignItems: 'center', flex: 1, gap: spacing.md, justifyContent: 'center' },
  qualityItem: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
})