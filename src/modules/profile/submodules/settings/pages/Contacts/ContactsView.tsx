import { ScrollView, View } from 'react-native'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import Section from '@shared/components/layout/Section'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import { ContactFormView } from '../../components/ContactForm'
import { ContactIconListView } from '@shared/components/ui/ContactIconList'
import { useContactsViewModel } from './useContactsViewModel'

/**
 * ContactsView - Página institucional de contato.
 *
 * Exibe informações de contato da empresa, formulário de envio de mensagens,
 * ícones de redes sociais e canais diretos (WhatsApp, E-mail etc).
 *
 * Estrutura:
 * 1. Cabeçalho
 * 2. Texto descritivo
 * 3. Formulário de contato
 * 4. Ícones circulares de contato
 */
export function ContactsView() {
  const { contactItems } = useContactsViewModel()

  return (
    <ScrollView style={sharedStyles.screen}>
      <Section>
        {/* Cabeçalho */}
        <Heading
          level={1}
          style={{
            textAlign: 'center',
            color: colors.primary,
            marginBottom: spacing.xl,
            fontSize: 28,
            fontWeight: '700',
          }}
        >
          Entre em contato
        </Heading>

        {/* Texto Descritivo */}
        <Text
          style={{
            fontSize: 14,
            lineHeight: 22,
            color: colors.text,
            marginBottom: spacing.lg,
            textAlign: 'center',
          }}
        >
          Tem dúvidas, sugestões ou deseja conhecer mais sobre os nossos serviços? Envie uma mensagem ou acesse um dos nossos canais.
        </Text>


        {/* Formulário de Contato */}
        <View style={{ marginBottom: spacing.xl, width: '100%' }}>
          <ContactFormView />
        </View>
      </Section>
    </ScrollView>
  )
}

export default ContactsView
