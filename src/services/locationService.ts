import * as Location from 'expo-location'

export type DeviceLocation = {
  latitude: number
  longitude: number
}

export async function requestDeviceLocation(): Promise<DeviceLocation | null> {
  const permission = await Location.requestForegroundPermissionsAsync()
  if (!permission.granted) return null

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  })

  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  }
}