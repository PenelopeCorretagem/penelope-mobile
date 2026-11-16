import { ScrollView, Image, View } from 'react-native'
import Section from '@shared/components/layout/Section'
import { colors, styles, spacing } from '@shared/styles/style'
import Text from '@shared/components/ui/Text'
import Heading from '@shared/components/ui/Heading'
import { useTranslation } from 'react-i18next'

export default function AboutView() {
  const currentYear = new Date().getFullYear()
  const { t } = useTranslation()

  return (
    <ScrollView style={styles.screen}>
      <Section style={{gap: spacing.md}}>
        <Heading style={{ color: colors.primary}}>{t('settings.aboutPage.title')}</Heading>
        <View style={{ gap: spacing.lg }}>
          <Text style={{ color: colors.text }}>
            {t('settings.aboutPage.paragraphOne')}
          </Text>
          <Text style={{ color: colors.text }}>
            {t('settings.aboutPage.paragraphTwo')}
          </Text>
        </View>
        <Text style={{ color: colors.text }}>
            {t('settings.aboutPage.copyright', { year: currentYear })}
          </Text>
      </Section>
    </ScrollView>
  )
}
