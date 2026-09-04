import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors, spacing, styles } from '@shared/styles/style'

function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={[tabStyles.tabBar, styles.paddingTab]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key]
        const isActive = state.index === index
        const label = options.title ?? route.name

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityLabel={label}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              })
              if (!isActive && !event.defaultPrevented) {
                navigation.navigate(route.name)
              }
            }}
            style={[tabStyles.tabItem, isActive && tabStyles.tabItemActive]}
          >
            {options.tabBarIcon?.({
              color: isActive ? colors.primary : colors.secondaryLight,
              size: 22,
              focused: isActive,
            })}
            <Text
              style={[
                tabStyles.tabLabel,
                { color: isActive ? colors.primary : colors.secondaryLight },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

export default function TabLayout() {
  return (
    <Tabs
      backBehavior="history"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="imoveis"
        options={{ title: 'Imóveis', tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{ title: 'Favoritos', tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{ title: 'Dashboard', href: null, tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart-outline" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="perfil"
        options={{ title: 'Perfil', tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} /> }}
      />
    </Tabs>
  )
}

const tabStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 12,
  },
  tabItemActive: {
    backgroundColor: '#f9edf5',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
})