import { Stack, usePathname } from "expo-router";
import { View } from "react-native";
import Header from "@shared/components/layout/Header";

export default function RootLayout() {
  const pathname = usePathname();
  const shouldHideHeader =
    pathname === "/" || pathname === "/login" || pathname === "/cadastro";

  return (
    <View style={{ flex: 1 }}>
      {!shouldHideHeader ? <Header /> : null}
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
