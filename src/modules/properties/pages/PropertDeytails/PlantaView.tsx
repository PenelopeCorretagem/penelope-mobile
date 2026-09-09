import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import Section from '@shared/components/layout/Section'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import { usePropertDeytailsImagens } from './usePropertDeytailsImagens'

export default function PlantaView() {
  const router = useRouter()
  const { plantas, isLoading } = usePropertDeytailsImagens()

  return (
    <View style={sharedStyles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </Pressable>
        <Heading level={2}>Plantas ({plantas.length})</Heading>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? (
        <Section style={styles.loadingContainer}>
          <Text>Carregando plantas...</Text>
        </Section>
      ) : plantas.length === 0 ? (
        <Section style={styles.emptyContainer}>
          <Ionicons name="document-outline" size={48} color={colors.mutedText} />
          <Text>Nenhuma planta disponível</Text>
        </Section>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {plantas.map((planta: any, index: number) => (
            <Section key={planta.id} style={styles.plantaContainer}>
              <Text style={styles.plantaLabel}>Planta {index + 1}</Text>
              <Image source={{ uri: planta.url }} style={styles.plantaImage} />
            </Section>
          ))}
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  loadingContainer: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  emptyContainer: { alignItems: 'center', flex: 1, gap: spacing.md, justifyContent: 'center' },
  scrollContent: { paddingBottom: spacing.xl },
  plantaContainer: { marginVertical: spacing.md },
  plantaLabel: { color: colors.primary, fontSize: 14, fontWeight: '600', marginBottom: spacing.md },
  plantaImage: { aspectRatio: 1, borderRadius: 8, width: '100%' },
})
