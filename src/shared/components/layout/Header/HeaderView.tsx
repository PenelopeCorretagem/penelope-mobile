import { StyleSheet, View } from 'react-native'
import NavMenu from '@shared/components/layout/NavMenu'
import { colors } from '@shared/styles/style'

export default function Header() {
  return (
    <View style={styles.container}>
      <NavMenu />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white, borderBottomColor: colors.primaryLight, borderBottomWidth: 1 },
})
