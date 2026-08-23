import { Link } from 'expo-router'
import { ActivityIndicator, Image, ScrollView, View } from 'react-native'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import Alert from '@shared/components/feedback/Alert'
import Footer from '@shared/components/layout/Footer'
import Section from '@shared/components/layout/Section'
import Button from '@shared/components/ui/Button'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import { useHomeViewModel } from './useHomeViewModel'


export function HomeView() {
  const { featuredAdvertisement, launchAdvertisements, isLoading, error, refresh } = useHomeViewModel()

  if (isLoading) {
    return (
      <Section>
        <ActivityIndicator color={colors.primary} size="large" />
        <Text>Carregando lançamentos...</Text>
      </Section>
    )
  }

  if (error) {
    return (
      <Section>
        <Alert message={error} />
        <Button onPress={refresh}>Tentar novamente</Button>
      </Section>
    )
  }

  return (
    <ScrollView style={sharedStyles.screen}>
      {featuredAdvertisement ? (
        <View>
          {/* IMÓVEL */}
        </View>
      ) : null}

      <Section>
        <Heading>Nossos lançamentos</Heading>
         {/* IMÓVEIS */}
      </Section>

      <Section>
        <Heading>Seu sonho começa com uma chave</Heading>
        <Text>
           Penélope une o melhor dos dois mundos: a experiência e credibilidade da 
           Cury no mercado imobiliário com um atendimento humanizado, próximo e pensado 
           especialmente para quem está dando os primeiros passos rumo à casa própria.
        </Text>
        <Link href="/sobre" asChild>
          <Button>Saiba mais</Button>
        </Link>
      </Section>
      <Footer />
    </ScrollView>
  )
}

const styles = {
  ...sharedStyles,
}
