import { router } from 'expo-router'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import Alert from '@shared/components/feedback/Alert'
import Section from '@shared/components/layout/Section'
import Button from '@shared/components/ui/Button'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import FeaturedAdvertisementCard from '@properties/components/FeaturedAdvertisementCard'
import AdvertisementCardView from 'src/modules/properties/components/AdvertisementCard/AdvertisementCardView'
import { useHomeViewModel } from './useHomeViewModel'
import { APP_ROUTES } from "@constant/routes";

export function HomeView() {
  const { featuredAdvertisement, launchAdvertisements, isLoading, error, refresh } = useHomeViewModel()

  if (isLoading) {
    return (
      <Section style={styles.state}>
          <ActivityIndicator color={colors.primary} size="large" />
          <Text>Carregando lançamentos...</Text>
      </Section>
    )
  }

  if (error) {
    return (
      <View style={sharedStyles.screen}>
        <Section style={styles.state}>
          <Alert message={error} />
          <Button onPress={refresh}>Tentar novamente</Button>
        </Section>
      </View>
    )
  }

  return (
    <ScrollView style={sharedStyles.screen}>
      {featuredAdvertisement ? (
        <Section style={styles.featureAdvertisementSection}>
          <FeaturedAdvertisementCard advertisement={featuredAdvertisement} />
        </Section>
      ) : null}

      <Section style={styles.launchAdvertisementSection}>
        <View style={styles.headlineRow}>
          <Heading level={3}>Lançamentos</Heading>
          <Pressable onPress={() => router.push(APP_ROUTES.imoveis)}>
            <Text style={styles.linkText}>Ver todos</Text>
          </Pressable>
        </View>

        <View style={styles.cardsRow}>
          {launchAdvertisements.slice(0, 3).map((advertisement) => (
            <AdvertisementCardView key={advertisement.id} advertisement={advertisement} />
          ))}
        </View>
      </Section>

      <Section style={styles.aboutSection}>
        <Heading level={1} style={styles.title}>Seu próximo lar começa aqui.</Heading>
        <Text style={styles.subtitle}>
          Descubra imóveis com localização privilegiada, design moderno e atendimento
          pensado para você encontrar a melhor opção.
        </Text>
        <Button onPress={() => router.push(APP_ROUTES.sobre)}>Saiba mais</Button>
      </Section>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  state: {
    height: '100%',
    gap: spacing.md,
  },
  featureAdvertisementSection: {
    backgroundColor: colors.surface,
    marginHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  launchAdvertisementSection: {
    backgroundColor: colors.background,
    gap: spacing.md,
  },
  aboutSection: {
    backgroundColor: colors.surface,
    gap: spacing.md,
  },
  title: {
    color: colors.text,
  },
  subtitle: {
    color: colors.mutedText,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  shortcutRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  shortcut: {
    backgroundColor: '#f9edf5',
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  shortcutText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  summarySection: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  summaryItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    flex: 1,
    padding: spacing.md,
  },
  metric: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
  },
  metricLabel: {
    color: colors.mutedText,
    fontSize: 12,
    marginTop: 6,
  },
  headlineRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    width: '100%',
  },
  linkText: {
    color: colors.primary,
    fontWeight: '600',
  },
  cardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  storyText: {
    color: colors.mutedText,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
})
