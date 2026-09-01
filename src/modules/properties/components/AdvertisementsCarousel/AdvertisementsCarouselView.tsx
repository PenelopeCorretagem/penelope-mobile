import { useState } from 'react'
import { FlatList, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native'
import { Advertisement } from '@dtos/Advertisement'
import Heading from '@shared/components/ui/Heading'
import { colors, spacing } from '@shared/styles/style'
import AdvertisementCard from '../AdvertisementCard'

type AdvertisementsCarouselProps = {
  advertisements: Advertisement[]
  title: string
}

export default function AdvertisementsCarouselView({ advertisements, title }: AdvertisementsCarouselProps) {
  const [contentWidth, setContentWidth] = useState(0)
  const [progress, setProgress] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(0)
  const isScrollable = contentWidth > viewportWidth

  if (advertisements.length === 0) return null

  const handleLayout = (event: LayoutChangeEvent) => {
    setViewportWidth(event.nativeEvent.layout.width)
  }

  const handleScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const maxOffset = nativeEvent.contentSize.width - nativeEvent.layoutMeasurement.width
    setProgress(maxOffset > 0 ? nativeEvent.contentOffset.x / maxOffset : 0)
  }

  return (
    <View style={styles.container}>
      <Heading level={3}>{title}</Heading>
      <View onLayout={handleLayout} style={styles.viewport}>
        <FlatList
          data={advertisements}
          decelerationRate="fast"
          horizontal
          keyExtractor={(advertisement) => String(advertisement.id)}
          onContentSizeChange={(width) => setContentWidth(width)}
          onScroll={handleScroll}
          pagingEnabled
          renderItem={({ item }) => (
            <View style={[styles.page, { width: viewportWidth }]}>
              <AdvertisementCard advertisement={item} width={Math.max(viewportWidth - spacing.md * 2, 0)} />
            </View>
          )}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {isScrollable ? (
        <View accessibilityLabel={`Progresso do carrossel ${title}: ${Math.round(progress * 100)} por cento`} style={styles.progressTrack}>
          <View style={[styles.progressValue, { width: `${Math.max(progress * 100, 10)}%` }]} />
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
    width: '100%',
  },
  viewport: {
    width: '100%',
  },
  page: {
    alignItems: 'center',
  },
  progressTrack: {
    backgroundColor: colors.surface,
    borderRadius: 2,
    height: 4,
    overflow: 'hidden',
  },
  progressValue: {
    backgroundColor: colors.primary,
    borderRadius: 2,
    height: '100%',
  },
})