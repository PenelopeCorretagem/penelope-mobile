import { ScrollView, Image, View } from 'react-native'
import Section from '@shared/components/layout/Section'
import { colors, styles, spacing } from '@shared/styles/style'
import Text from '@shared/components/ui/Text'
import Heading from '@shared/components/ui/Heading'

export default function AboutView() {
  const currentYear = new Date().getFullYear()

  return (
    <ScrollView style={styles.screen}>
      <Section style={{gap: spacing.md}}>
        <Heading style={{ color: colors.primary}}>Sobre nós</Heading>
        <View style={{ gap: spacing.lg }}>
          <Text style={{ color: colors.text }}>
            A Penelope Corretora de Imóveis é uma plataforma dedicada a oferecer soluções imobiliárias de alta qualidade.
          </Text>
          <Text style={{ color: colors.text }}>
            Nossa missão é proporcionar uma experiência excepcional aos nossos clientes, garantindo transparência, confiança e satisfação em todas as etapas do processo imobiliário. Valorizamos relacionamentos duradouros e buscamos sempre superar as expectativas.
          </Text>
        </View>
        <Text style={{ color: colors.text }}>
            © {currentYear} Penélope - Consultora de Imóveis | Todos os direitos reservados.
          </Text>
      </Section>
    </ScrollView>
  )
}
