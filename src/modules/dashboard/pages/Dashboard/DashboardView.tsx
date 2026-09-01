import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, View } from 'react-native';
import Section from '@shared/components/layout/Section';
import Heading from '@shared/components/ui/Heading';
import Text from '@shared/components/ui/Text';
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style';

const statCards = [
  { label: 'Ativos disponíveis', value: '128', icon: 'home-outline', color: colors.primary },
  { label: 'Reservas este mês', value: '24', icon: 'calendar-outline', color: '#2f6b9d' },
  { label: 'Leads qualificadas', value: '41', icon: 'people-outline', color: '#2d7d6b' },
];

const activity = [
  '4 novos imóveis foram adicionados esta semana.',
  '2 clientes solicitaram visita virtual.',
  'O desempenho dos imóveis em destaque está acima da meta.',
];

export default function DashboardView() {
  return (
    <ScrollView style={sharedStyles.screen}>
      <Section style={styles.headerSection}>
        <Heading level={1} style={styles.title}>Dashboard</Heading>
        <Text style={styles.subtitle}>Resumo geral do seu portfólio e atendimento.</Text>
      </Section>

      <Section style={styles.grid}>
        {statCards.map((card) => (
          <View key={card.label} style={[styles.card, { borderColor: card.color }]}>
            <View style={[styles.iconBox, { backgroundColor: `${card.color}20` }]}>
              <Ionicons name={card.icon as any} size={22} color={card.color} />
            </View>
            <Text style={styles.cardValue}>{card.value}</Text>
            <Text style={styles.cardLabel}>{card.label}</Text>
          </View>
        ))}
      </Section>

      <Section>
        <Heading level={3}>Atividade recente</Heading>
        <View style={styles.activityList}>
          {activity.map((item) => (
            <View key={item} style={styles.activityItem}>
              <Ionicons name="radio-button-on" size={14} color={colors.primary} />
              <Text style={styles.activityText}>{item}</Text>
            </View>
          ))}
        </View>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    paddingBottom: spacing.md,
  },
  title: {
    color: colors.primary,
  },
  subtitle: {
    color: colors.mutedText,
    marginTop: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.md,
    width: '46%',
  },
  iconBox: {
    alignItems: 'center',
    borderRadius: 10,
    height: 42,
    justifyContent: 'center',
    marginBottom: spacing.sm,
    width: 42,
  },
  cardValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardLabel: {
    color: colors.mutedText,
    fontSize: 12,
  },
  activityList: {
    marginTop: spacing.md,
  },
  activityItem: {
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  activityText: {
    color: colors.text,
    flex: 1,
    lineHeight: 20,
    marginLeft: spacing.sm,
  },
});
