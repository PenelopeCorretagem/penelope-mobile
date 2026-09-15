import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import Section from '@shared/components/layout/Section'
import Alert from '@shared/components/feedback/Alert'
import Button from '@shared/components/ui/Button'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import ImageCarouselModal from '@properties/components/ImageCarouselModal'
import { usePropertyMediaViewModel } from '../PropertyDetails/usePropertyMediaViewModel'

export default function PropertyPlanView() {
  const router = useRouter()
  const { plans, error, isLoading, retry } = usePropertyMediaViewModel()
  const [selectedPlantIndex, setSelectedPlantIndex] = useState<number | null>(null)

  return (
    <View style={sharedStyles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </Pressable>
        <Heading level={2}>Plantas ({plans.length})</Heading>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? (
        <Section style={styles.loadingContainer}>
          <Text>Carregando plantas...</Text>
        </Section>
      ) : error ? (
        <Section style={styles.emptyContainer}>
          <Alert message={error} />
          <Button onPress={retry}>Tentar novamente</Button>
        </Section>
      ) : plans.length === 0 ? (
        <Section style={styles.emptyContainer}>
          <Ionicons name="document-outline" size={48} color={colors.mutedText} />
          <Text>Nenhuma planta disponível</Text>
        </Section>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {plans.map((plan, index) => (
            <Section key={plan.id} style={styles.planContainer}>
              <Text style={styles.planLabel}>Planta {index + 1}</Text>
              <Pressable accessibilityLabel={`Abrir planta ${index + 1}`} accessibilityRole="button" onPress={() => setSelectedPlantIndex(index)}>
                <Image source={{ uri: plan.url }} style={styles.planImage} />
              </Pressable>
            </Section>
          ))}
        </ScrollView>
      )}

      <ImageCarouselModal
        images={plans}
        initialIndex={selectedPlantIndex ?? 0}
        onClose={() => setSelectedPlantIndex(null)}
        title="Planta do imóvel"
        visible={selectedPlantIndex !== null}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  loadingContainer: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  emptyContainer: { alignItems: 'center', flex: 1, gap: spacing.md, justifyContent: 'center' },
  scrollContent: { paddingBottom: spacing.xl },
  planContainer: { marginVertical: spacing.md },
  planLabel: { color: colors.primary, fontSize: 14, fontWeight: '600', marginBottom: spacing.md },
  planImage: { aspectRatio: 1, borderRadius: 8, width: '100%' },
})
