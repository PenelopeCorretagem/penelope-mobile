import { StyleSheet } from 'react-native'

export const colors = {
  primary: '#b33c8e',
  primaryLight: '#e9bedc',
  secondary: '#36221d',
  secondaryLight: '#816862',
  background: '#ebe9e9',
  surface: '#dedede',
  text: '#1f1d1f',
  mutedText: '#777676',
  white: '#ffffff',
  error: '#a52525',
}

export const spacing = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
}

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
  },
  paddingHeader: {
    paddingTop: spacing.md + 30,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  paddingTab: {
    paddingBottom: spacing.md + 10,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
  }
})