import { ScrollView, StyleSheet, View } from 'react-native'
import HeaderView from '@shared/components/layout/Header'
import Section from '@shared/components/layout/Section'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import { useFavorites } from '@shared/context/FavoritesContext'

export default function FavoritesView() {
  const { favoriteIds } = useFavorites()

  return (
    <ScrollView style={sharedStyles.screen}>
      <Section>
        <Heading level={1} style={styles.title}>Favoritos</Heading>
        <Text style={styles.subtitle}>
          {favoriteIds.length > 0
            ? 'Seus imóveis salvos ficam aqui.'
            : 'Você ainda não salvou nenhum imóvel como favorito.'}
        </Text>

        {favoriteIds.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>Explore a busca e toque no coração para guardar os imóveis que você gosta.</Text>
          </View>
        ) : null}
      </Section>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    color: colors.primary,
  },
  subtitle: {
    color: colors.mutedText,
    marginTop: spacing.sm,
  },
  emptyCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginTop: spacing.xl,
    padding: spacing.lg,
  },
  emptyText: {
    color: colors.text,
    lineHeight: 22,
  },
})
