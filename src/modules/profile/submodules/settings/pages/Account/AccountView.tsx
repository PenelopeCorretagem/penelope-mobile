import { ScrollView, StyleSheet, View } from 'react-native';
import Section from '@shared/components/layout/Section';
import Heading from '@shared/components/ui/Heading';
import Text from '@shared/components/ui/Text';
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style';

const accountFields = [
  { label: 'Nome', value: 'Maria da Silva' },
  { label: 'E-mail', value: 'maria@penelope.com.br' },
  { label: 'Telefone', value: '(11) 99999-0000' },
];

export default function AccountView() {
  return (
    <ScrollView style={sharedStyles.screen}>
      <Section>
        <Heading level={1} style={styles.title}>Configurações da conta</Heading>
        <Text style={styles.subtitle}>Atualize os seus dados pessoais e preferências.</Text>

        <View style={styles.card}>
          {accountFields.map((field) => (
            <View key={field.label} style={styles.row}>
              <Text style={styles.label}>{field.label}</Text>
              <Text style={styles.value}>{field.value}</Text>
            </View>
          ))}
        </View>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.primary,
  },
  subtitle: {
    color: colors.mutedText,
    marginTop: spacing.sm,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: spacing.xl,
    padding: spacing.md,
  },
  row: {
    borderBottomColor: '#e9e9e9',
    borderBottomWidth: 1,
    paddingVertical: spacing.md,
  },
  label: {
    color: colors.mutedText,
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  value: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
