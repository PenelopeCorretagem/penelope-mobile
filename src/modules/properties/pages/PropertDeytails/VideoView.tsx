import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import WebView from 'react-native-webview'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Heading from '@shared/components/ui/Heading'
import Text from '@shared/components/ui/Text'
import Section from '@shared/components/layout/Section'
import Button from '@shared/components/ui/Button'
import { colors, spacing, styles as sharedStyles } from '@shared/styles/style'
import { usePropertDeytailsImagens } from './usePropertDeytailsImagens'

function getYouTubeEmbedUrl(url: string): string | null {
  // Detecta YouTube URLs em vários formatos
  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  const match = url.match(youtubeRegex)
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`
  }
  return null
}

function isVideoUrl(url: string): boolean {
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv', '.m3u8']
  const isVideoFile = videoExtensions.some(ext => url.toLowerCase().includes(ext))
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be')
  return isVideoFile || isYouTube
}

export default function VideoView() {
  const router = useRouter()
  const { videos, isLoading } = usePropertDeytailsImagens()

  const openVideoExternal = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open video:', err))
  }

  return (
    <View style={sharedStyles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </Pressable>
        <Heading level={2}>Vídeos ({videos.length})</Heading>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? (
        <Section style={styles.loadingContainer}>
          <Text>Carregando vídeos...</Text>
        </Section>
      ) : videos.length === 0 ? (
        <Section style={styles.emptyContainer}>
          <Ionicons name="videocam-outline" size={48} color={colors.mutedText} />
          <Text>Nenhum vídeo disponível</Text>
        </Section>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {videos.map((video: any, index: number) => {
            const embedUrl = getYouTubeEmbedUrl(video.url)
            const isYouTube = embedUrl !== null

            return (
              <Section key={video.id} style={styles.videoContainer}>
                <Text style={styles.videoLabel}>Vídeo {index + 1}</Text>

                {isYouTube ? (
                  <View style={styles.webViewContainer}>
                    <WebView
                      source={{ uri: embedUrl }}
                      style={styles.webView}
                      javaScriptEnabled={true}
                      domStorageEnabled={true}
                      allowsFullscreenVideo={true}
                    />
                  </View>
                ) : isVideoUrl(video.url) ? (
                  <View style={styles.videoPreview}>
                    <Ionicons name="play-circle" size={64} color={colors.primary} />
                    <Text style={styles.videoUrlText} numberOfLines={2}>
                      {video.url}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.videoPreview}>
                    <Ionicons name="link" size={48} color={colors.mutedText} />
                    <Text style={styles.videoUrlText} numberOfLines={2}>
                      {video.url}
                    </Text>
                  </View>
                )}

                <Button
                  onPress={() => openVideoExternal(video.url)}
                  style={styles.openButton}
                >
                  {isYouTube ? 'Abrir no YouTube' : 'Abrir Vídeo'}
                </Button>
              </Section>
            )
          })}
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  loadingContainer: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  emptyContainer: { alignItems: 'center', flex: 1, gap: spacing.md, justifyContent: 'center' },
  scrollContent: { paddingBottom: spacing.xl },
  videoContainer: { marginVertical: spacing.md },
  videoLabel: { color: colors.primary, fontSize: 14, fontWeight: '600', marginBottom: spacing.md },
  webViewContainer: { borderRadius: 8, height: 300, marginBottom: spacing.md, overflow: 'hidden' },
  webView: { flex: 1, width: '100%' },
  videoPreview: { alignItems: 'center', aspectRatio: 16 / 9, backgroundColor: colors.surface, borderRadius: 8, gap: spacing.md, justifyContent: 'center', marginBottom: spacing.md, paddingHorizontal: spacing.lg, width: '100%' },
  videoUrlText: { color: colors.mutedText, fontSize: 12, textAlign: 'center' },
  openButton: { marginTop: spacing.md },
})
