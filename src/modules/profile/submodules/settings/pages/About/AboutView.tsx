import { ScrollView, Image, View } from 'react-native'
import Section from '@shared/components/layout/Section'
import { colors, styles, spacing } from '@shared/styles/style'
import Text from '@shared/components/ui/Text'
import Heading from '@shared/components/ui/Heading'

export default function AboutView() {
  return (
    <ScrollView style={styles.screen}>
      <Section style={{gap: spacing.md}}>
        <Heading style={{ color: colors.primary}}>Sobre a Penelope Corretora de Imóveis</Heading>
        <View style={{ gap: spacing.lg }}>
          <Text style={{ color: colors.text }}>
            A Penelope Corretora de Imóveis é uma empresa dedicada a oferecer soluções imobiliárias de alta qualidade. Com anos de experiência no mercado, nossa equipe de profissionais está comprometida em ajudar nossos clientes a encontrar o imóvel perfeito, seja para compra, venda ou aluguel.
          </Text>
          <Text style={{ color: colors.text }}>
            Nossa missão é proporcionar uma experiência excepcional aos nossos clientes, garantindo transparência, confiança e satisfação em todas as etapas do processo imobiliário. Valorizamos relacionamentos duradouros e buscamos sempre superar as expectativas.
          </Text>
        </View>
      </Section>
    </ScrollView>
  )
}
