import { ActivityIndicator, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import Alert from '@shared/components/feedback/Alert'
import Button from '@shared/components/ui/Button'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import Section from '@shared/components/layout/Section'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import { getLocationLabel, getYouTubeVideoId, propertyQualities } from './PropertyDetailsModel'
import { usePropertyDetailsViewModel } from './usePropertyDetailsViewModel'
import { LinearGradient } from 'expo-linear-gradient'
export default function PropertyDetailsView() {
  const { width } = useWindowDimensions()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const {
    advertisement,
    error,
    isLoading,
    retry,
    images,
    plans,
    videos,
    isVideoModalVisible,
    selectedQuality,
    presentation,
    mapImageUrl,
    openGallery,
    openFloorPlan,
    openVideo,
    closeVideo,
    openQualityExplanation,
    closeQualityExplanation,
    openMap,
  } = usePropertyDetailsViewModel()

  useEffect(() => {
    setActiveImageIndex(0)
  }, [advertisement?.id])

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

  const { property } = advertisement
  const { imageUrls, typeLabel, dormitoriesLabel, firstThreeAmenities, hasCoordinates } = presentation!

  return (
    <>
    <ScrollView style={sharedStyles.screen}>
      {imageUrls.length > 0 ? (
        <View style={styles.imageContainer}>
          <FlatList
            key={String(advertisement.id)}
            data={imageUrls}
            decelerationRate="fast"
            horizontal
            keyExtractor={(url, index) => `${url}-${index}`}
            nestedScrollEnabled
            onMomentumScrollEnd={(event) => {
              const pageWidth = event.nativeEvent.layoutMeasurement.width
              if (pageWidth > 0) {
                setActiveImageIndex(Math.round(event.nativeEvent.contentOffset.x / pageWidth))
              }
            }}
            pagingEnabled
            renderItem={({ item: imageUrl }) => (
              <Image
                accessibilityLabel={`Imagem do imóvel ${property.title ?? ''}`}
                source={{ uri: imageUrl }}
                style={[styles.image, { width }]}
              />
            )}
            scrollEnabled={imageUrls.length > 1}
            showsHorizontalScrollIndicator={false}
          />
          {imageUrls.length > 1 ? (
            <View accessibilityLabel={`Imagem ${activeImageIndex + 1} de ${imageUrls.length}`} style={styles.imageCountBadge}>
              <Text style={styles.imageCountText}>{activeImageIndex + 1} / {imageUrls.length}</Text>
            </View>
          ) : null}
        </View>
      ) : null}

      <LinearGradient
        colors={['#B33D8E', '#8E316C', '#47213A', '#281A1F']}
        style={styles.detailsSection}
      >
        <View style={styles.headerCard}>
          <Section style={styles.headerSection}>
            <Text style={styles.typeBadge}>{typeLabel}</Text>
            <Heading level={1} style={styles.title}>
              {property.title ?? 'Imóvel sem título'}
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
        {images.length > 0 ? (
          <Pressable
            onPress={openGallery}
            style={[styles.actionButtonFull, styles.actionButtonFilled]}
          >
            <Ionicons name="images-outline" size={18} color={colors.primary} />
            <Text style={styles.actionButtonTextFilled}>VER GALERIA</Text>
          </Pressable>
        ) : null}
        {plans.length > 0 ? (
          <Pressable
            onPress={openFloorPlan}
            style={[styles.actionButtonFull, styles.actionButtonFilled]}
          >
            <Ionicons name="document-outline" size={18} color={colors.primary} />
            <Text style={styles.actionButtonTextFilled}>VER PLANTA</Text>
          </Pressable>
        ) : null}
        {videos.length > 0 ? (
          <Pressable
            onPress={openVideo}
            style={[styles.actionButtonFull, styles.actionButtonFilled]}
          >
            <Ionicons name="videocam" size={18} color={colors.primary} />
            <Text style={styles.actionButtonTextFilled}>ASSISTIR VÍDEO</Text>
          </Pressable>
        ) : null}
      </Section>

  </LinearGradient>

      {property.description ? (
        <Section style={[styles.section, styles.lightSection]}>
          <Heading level={3} style={styles.sectionTitle}>DESCRIÇÃO</Heading>
          <Text style={styles.body}>{property.description}</Text>
        </Section>
      ) : null}

      {property.amenities && property.amenities.length > 0 ? (
        <Section style={[styles.section, styles.darkSection]}>
          <Heading level={3} style={styles.sectionTitle}>DIFERENCIAIS</Heading>
          <View style={styles.amenitiesGrid}>
            {property.amenities.map((amenity, index) => (
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
        {propertyQualities.map((quality) => (
            <Pressable
              accessibilityHint="Abre uma explicação resumida"
              accessibilityLabel={`Ver por que este imóvel tem a insígnia ${quality.title}`}
              accessibilityRole="button"
              key={quality.key}
              onPress={() => openQualityExplanation(quality)}
              style={({ pressed }) => [styles.qualityItem, pressed && styles.qualityItemPressed]}
            >
              <Ionicons name={quality.icon} size={30} color={colors.primary} />
              <Text style={styles.body}>{quality.title}</Text>
              <Ionicons name="information-circle-outline" size={16} color={colors.primary} />
            </Pressable>
          ))}
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

    <Modal animationType="fade" onRequestClose={closeVideo} statusBarTranslucent transparent visible={isVideoModalVisible}>
      <View style={styles.videoModalBackdrop}>
        <View style={styles.videoModalHeader}>
          <Text style={styles.videoModalTitle}>Vídeo do imóvel</Text>
          <Pressable accessibilityLabel="Fechar vídeo" accessibilityRole="button" onPress={closeVideo} style={styles.videoCloseButton}>
            <Ionicons name="close" size={28} color={colors.white} />
          </Pressable>
        </View>
        <View style={styles.videoContainer}>
          {videos[0]?.url && getYouTubeVideoId(videos[0].url) ? (
            <YoutubePlayer
              height={220}
              play={false}
              videoId={getYouTubeVideoId(videos[0].url) ?? undefined}
              webViewProps={{
                allowsFullscreenVideo: true,
                mediaPlaybackRequiresUserAction: false,
              }}
            />
          ) : null}
        </View>
      </View>
    </Modal>

    <Modal animationType="fade" onRequestClose={closeQualityExplanation} transparent visible={selectedQuality !== null}>
      <Pressable onPress={closeQualityExplanation} style={styles.qualityModalBackdrop}>
        <View onStartShouldSetResponder={() => true} style={styles.qualityModalCard}>
          <View style={styles.qualityModalHeader}>
            <Text style={styles.qualityModalTitle}>{selectedQuality?.title}</Text>
            <Pressable
              accessibilityLabel="Fechar explicação da insígnia"
              accessibilityRole="button"
              onPress={closeQualityExplanation}
              style={styles.qualityCloseButton}
            >
              <Ionicons name="close" size={24} color={colors.mutedText} />
            </Pressable>
          </View>
          <Text style={styles.qualityModalBody}>{selectedQuality?.explanation}</Text>
        </View>
      </Pressable>
    </Modal>
    </>
  )
}

const styles = StyleSheet.create({
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
  qualityItem: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, justifyContent: 'center', marginBottom: spacing.sm, padding: spacing.sm, width: '46%' },
  qualityItemPressed: { opacity: 0.65 },
  detailsSection: { width: '100%', paddingVertical: 18 },
  videoModalBackdrop: { backgroundColor: 'rgba(0, 0, 0, 0.96)', flex: 1, justifyContent: 'center', paddingHorizontal: spacing.md },
  videoModalHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
  videoModalTitle: { color: colors.white, fontSize: 16, fontWeight: '700' },
  videoCloseButton: { padding: spacing.sm },
  videoContainer: { aspectRatio: 16 / 9, backgroundColor: '#000', overflow: 'hidden', width: '100%' },
  qualityModalBackdrop: { alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.45)', flex: 1, justifyContent: 'center', padding: spacing.lg },
  qualityModalCard: { backgroundColor: colors.white, borderRadius: 12, padding: spacing.lg, width: '100%' },
  qualityModalHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  qualityModalTitle: { color: colors.primary, fontSize: 18, fontWeight: '700' },
  qualityCloseButton: { padding: spacing.sm },
  qualityModalBody: { fontSize: 15, lineHeight: 22, marginTop: spacing.sm },
})