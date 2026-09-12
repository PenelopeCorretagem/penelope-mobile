import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Alert from '@shared/components/feedback/Alert'
import Button from '@shared/components/ui/Button'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import Section from '@shared/components/layout/Section'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import { getLocationLabel } from './PropertDeytailsModel'
import { usePropertDeytailsViewModel } from './usePropertDeytailsViewModel'
import { LinearGradient } from 'expo-linear-gradient'

export default function PropertDeytailsView() {
  const {
    advertisement,
    error,
    isLoading,
    retry,
    imagens,
    plantas,
    videos,
    presentation,
    mapImageUrl,
    openGallery,
    openFloorPlan,
    openVideo,
    openMap,
  } = usePropertDeytailsViewModel()

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
  const { imageUrls, imageUrl, typeLabel, dormitoriesLabel, firstThreeAmenities, hasCoordinates } = presentation!

  return (
    <ScrollView contentContainerStyle={styles.content} style={sharedStyles.screen}>
      {imageUrl ? (
        <Pressable accessibilityLabel="Abrir galeria de imagens" accessibilityRole="button" onPress={openGallery} style={styles.imageContainer}>
          <Image accessibilityLabel={`Imagem do imóvel ${estate.title ?? ''}`} source={{ uri: imageUrl }} style={styles.image} />
          {imageUrls.length > 1 ? (
            <View style={styles.imageCountBadge}>
              <Text style={styles.imageCountText}>{imageUrls.length}</Text>
            </View>
          ) : null}
        </Pressable>
      ) : null}

      <LinearGradient
        colors={['#B33D8E', '#8E316C', '#47213A', '#281A1F']}
        style={styles.detailsSection}
      >
        <View style={styles.headerCard}>
          <Section style={styles.headerSection}>
            <Text style={styles.typeBadge}>{typeLabel}</Text>
            <Heading level={1} style={styles.title}>
              {estate.title ?? 'Imóvel sem título'}
            </Heading>
            <Text style={styles.subtitle}>{getLocationLabel(advertisement)}</Text>
            {dormitoriesLabel ? <Text style={styles.subtitle}>{dormitoriesLabel}</Text> : null}

            {firstThreeAmenities.length > 0 ? (
              <View style={styles.amenitiesRow}>
                {firstThreeAmenities.map((amenity, index) => (
                  <View key={amenity.id ?? `${amenity.description ?? 'amenity'}-${index}`} style={styles.amenityBadge}>
                    <Text style={styles.amenityBadgeText}>{amenity.description || 'Diferencial'}</Text>
                  </View>
                ))}
              </View>
            ) : null}
          </Section>
        </View>


      <Section style={styles.actionButtonsSection}>
        <Pressable
          onPress={openGallery}
          style={[styles.actionButtonFull, styles.actionButtonFilled]}
          disabled={imagens.length === 0}
        >
          <Ionicons name="images-outline" size={18} color={colors.primary} />
          <Text style={styles.actionButtonTextFilled}>VER GALERIA</Text>
        </Pressable>
        <Pressable
          onPress={openFloorPlan}
          style={[styles.actionButtonFull, styles.actionButtonFilled]}
          disabled={plantas.length === 0}
        >
          <Ionicons name="document-outline" size={18} color={colors.primary} />
          <Text style={styles.actionButtonTextFilled}>VER PLANTA</Text>
        </Pressable>
        <Pressable
          onPress={openVideo}
          style={[styles.actionButtonFull, styles.actionButtonFilled]}
          disabled={videos.length === 0}
        >
          <Ionicons name="videocam" size={18} color={colors.primary} />
          <Text style={styles.actionButtonTextFilled}>ASSISTIR VÍDEO</Text>
        </Pressable>
      </Section>

  </LinearGradient>

      {estate.description ? (
        <Section style={[styles.section, styles.lightSection]}>
          <Heading level={3} style={styles.sectionTitle}>DESCRIÇÃO</Heading>
          <Text style={styles.body}>{estate.description}</Text>
        </Section>
      ) : null}

      {estate.amenities && estate.amenities.length > 0 ? (
        <Section style={[styles.section, styles.darkSection]}>
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

      <Section style={[styles.section, styles.lightSection]}>
        <Heading level={3} style={styles.sectionTitle}>QUALIDADES</Heading>
        <View style={styles.qualitiesGrid}>
          <View style={styles.qualityItem}>
            <Ionicons name="shield" size={30} color={colors.primary} />
            <Text style={styles.body}>Segurança</Text>
          </View>

          <View style={styles.qualityItem}>
            <Ionicons name="leaf" size={30} color={colors.primary} />
            <Text style={styles.body}>Área Verde</Text>
          </View>

          <View style={styles.qualityItem}>
            <Ionicons name="bus" size={30} color={colors.primary} />
            <Text style={styles.body}>Transporte</Text>
          </View>
        </View>
      </Section>

      {hasCoordinates ? (
        <LinearGradient
          colors={['#B33D8E', '#8E316C', '#47213A', '#281A1F']}
          style={styles.detailsSection}
        >
        <Section style={styles.sectionSecondary}>
          <Heading level={3} style={styles.sectionTitleSecondary}>LOCALIZAÇÃO</Heading>
          <View style={styles.addressSection}>
            <Ionicons name="location" size={20} color={colors.white} />
            <Text style={styles.addressText}>{getLocationLabel(advertisement)}</Text>
          </View>
          <Pressable
            onPress={() => {
              openMap()
            }}
            style={styles.mapContainer}
          >
            <Image
              source={{
                uri: mapImageUrl ?? undefined,
              }}
              style={styles.mapImage}
            />
            <View style={styles.mapOverlay}>
              <Ionicons name="map" size={32} color={colors.white} />
              <Text style={styles.mapText}>Ver no Google Maps</Text>
            </View>
          </Pressable>
        </Section>
        </LinearGradient>
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
  headerCard: { backgroundColor: colors.white, borderRadius: 8, marginHorizontal: spacing.lg, overflow: 'hidden' },
  headerSection: { alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  typeBadge: { borderRadius: 3, backgroundColor: colors.primary, color: colors.white, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: spacing.sm, paddingHorizontal: spacing.md, paddingVertical: 6 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: spacing.sm, textAlign: 'center' },
  subtitle: { color: colors.mutedText, fontSize: 13, fontWeight: '500', marginBottom: 4 },
  amenitiesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, justifyContent: 'center', paddingVertical: spacing.md },
  amenityBadge: { backgroundColor: colors.surface, borderRadius: 4, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  amenityBadgeText: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
  actionButtonsSection: { gap: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  actionButtonFull: { alignItems: 'center', borderRadius: 8, flexDirection: 'row', gap: spacing.md, justifyContent: 'center', paddingVertical: spacing.md, width: '100%' },
  actionButtonFilled: { backgroundColor: colors.white },
  actionButtonTextFilled: { color: colors.primary, fontSize: 14, fontWeight: '600', textAlign: 'center' },
  section: { alignItems: 'center', borderTopColor: colors.surface, borderTopWidth: 1, paddingHorizontal: spacing.lg, paddingVertical: spacing.lg },
  lightSection: { backgroundColor: colors.background },
  darkSection: { backgroundColor: colors.surface },
  sectionSecondary: { alignItems: 'stretch', paddingHorizontal: spacing.lg, paddingVertical: spacing.lg },
  sectionTitle: { color: colors.primary, fontSize: 20, fontWeight: '700', letterSpacing: 0.5, marginBottom: spacing.md, textAlign: 'center' },
  sectionTitleSecondary: { color: colors.white, fontSize: 20, fontWeight: '500', letterSpacing: 0.5, marginBottom: spacing.md, textAlign: 'center' },
  amenitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, justifyContent: 'center' },
  amenityChip: { backgroundColor: colors.secondary, borderRadius: 6, paddingHorizontal: spacing.sm, paddingVertical: 6 },
  amenityText: { color: colors.white, fontSize: 12, fontWeight: '600' },
  body: { fontSize: 14, lineHeight: 20, textAlign: 'center' },
  addressSection: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, justifyContent: 'center', marginBottom: spacing.md },
  addressText: { color: colors.white, fontSize: 14, lineHeight: 18},
  mapContainer: { borderRadius: 8, overflow: 'hidden', position: 'relative', width: '100%' },
  mapImage: { aspectRatio: 4 / 3, backgroundColor: colors.surface, width: '100%' },
  mapOverlay: { alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)', gap: spacing.sm, justifyContent: 'center', paddingVertical: spacing.lg, position: 'absolute', width: '100%', height: '100%' },
  mapText: { color: colors.white, fontSize: 14, fontWeight: '600' },
  state: { alignItems: 'center', flex: 1, gap: spacing.md, justifyContent: 'center' },
  qualitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, justifyContent: 'center', width: '100%' },
  qualityItem: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, justifyContent: 'center', marginBottom: spacing.sm, width: '46%' },
  detailsSection: { width: '100%', paddingVertical: 18 },
})