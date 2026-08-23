import { ScrollView, Text } from 'react-native'
import Section from '@shared/components/layout/Section'
import { colors, styles } from '@shared/styles/style'
import Footer from '@shared/components/layout/Footer'

export default function AboutView() {
  return (
    <ScrollView style={styles.screen}>
      <Section>
        <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700', letterSpacing: 1 }}>
          Imóveis
        </Text>
      </Section>
      <Footer />
    </ScrollView>
  )
}