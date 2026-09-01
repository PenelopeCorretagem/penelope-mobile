import { ScrollView, Text } from 'react-native'
import Section from '@shared/components/layout/Section'
import { colors, styles } from '@shared/styles/style'
import Footer from '@shared/components/layout/Footer'

export default function PropertDeytailsView() {
  return (
    <ScrollView style={styles.screen}>
      <Section>
        <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700', letterSpacing: 1 }}>
          Detalhes do imóvel
        </Text>
      </Section>
    </ScrollView>
  )
}