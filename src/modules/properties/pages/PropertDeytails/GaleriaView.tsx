import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import Section from '@shared/components/layout/Section'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import ImageCarouselModal from '@properties/components/ImageCarouselModal'
import { usePropertDeytailsImagens } from './usePropertDeytailsImagens'

export default function GaleriaView() {
  const router = useRouter()
  const { imagens, isLoading } = usePropertDeytailsImagens()
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  return (
    <View style={sharedStyles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </Pressable>
        <Heading level={2}>Galeria ({imagens.length})</Heading>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? (
        <Section style={styles.loadingContainer}>
          <Text>Carregando galeria...</Text>
        </Section>
      ) : imagens.length === 0 ? (
        <Section style={styles.emptyContainer}>
          <Ionicons name="images-outline" size={48} color={colors.mutedText} />
          <Text>Nenhuma imagem disponível</Text>
        </Section>
      ) : (
        <FlatList
          data={imagens}
          keyExtractor={item => String(item.id)}
          numColumns={2}
          contentContainerStyle={styles.gridContent}
          renderItem={({ item, index }) => (
            <Pressable accessibilityLabel={`Abrir imagem ${index + 1}`} accessibilityRole="button" onPress={() => setSelectedImageIndex(index)} style={styles.imageItem}>
              <Image source={{ uri: item.url }} style={styles.gridImage} />
            </Pressable>
          )}
        />
      )}

      <ImageCarouselModal
        images={imagens}
        initialIndex={selectedImageIndex ?? 0}
        onClose={() => setSelectedImageIndex(null)}
        title="Imagem da galeria"
        visible={selectedImageIndex !== null}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  loadingContainer: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  emptyContainer: { alignItems: 'center', flex: 1, gap: spacing.md, justifyContent: 'center' },
  gridContent: { paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  imageItem: { flex: 1, margin: spacing.sm },
  gridImage: { aspectRatio: 1, borderRadius: 8, width: '100%' },
})
