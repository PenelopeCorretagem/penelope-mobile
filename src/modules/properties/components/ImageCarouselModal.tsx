import { useEffect, useState } from 'react'
import { FlatList, Image, Modal, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing } from '@shared/styles/style'

type CarouselImage = {
  id: number
  url: string
}

type ImageCarouselModalProps = {
  images: CarouselImage[]
  initialIndex: number
  title: string
  visible: boolean
  onClose: () => void
}

export default function ImageCarouselModal({ images, initialIndex, title, visible, onClose }: ImageCarouselModalProps) {
  const { width, height } = useWindowDimensions()
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    if (visible) setCurrentIndex(initialIndex)
  }, [initialIndex, visible])

  return (
    <Modal animationType="fade" onRequestClose={onClose} statusBarTranslucent transparent visible={visible}>
      <View style={styles.backdrop}>
        <View style={styles.header}>
          <Text style={styles.counter}>{currentIndex + 1} / {images.length}</Text>
          <Pressable accessibilityLabel={`Fechar ${title}`} accessibilityRole="button" onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color={colors.white} />
          </Pressable>
        </View>

        <FlatList
          data={images}
          getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
          horizontal
          initialScrollIndex={initialIndex}
          keyExtractor={item => String(item.id)}
          onMomentumScrollEnd={event => {
            setCurrentIndex(Math.round(event.nativeEvent.contentOffset.x / width))
          }}
          pagingEnabled
          renderItem={({ item }) => (
            <View style={{ height, width }}>
              <Image accessibilityLabel={`${title} ${currentIndex + 1}`} resizeMode="contain" source={{ uri: item.url }} style={styles.image} />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: { backgroundColor: 'rgba(0, 0, 0, 0.96)', flex: 1 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingTop: spacing.xl + spacing.md, position: 'absolute', width: '100%', zIndex: 1 },
  counter: { color: colors.white, fontSize: 14, fontWeight: '600' },
  closeButton: { padding: spacing.sm },
  image: { height: '100%', width: '100%' },
})
