'use client'

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useAnimationControls } from "motion/react"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import { Slider } from "@base-ui-components/react/slider"



// -----------------------------
// Track Type
// -----------------------------
interface Track {
  id: number
  title: string
  artist: string
  cover: string
  audioUrl: string
  duration: number
}

// -----------------------------
// Playlist Data
// -----------------------------
const playlist: Track[] = [
  {
    id: 1,
    title: "Wishes",
    artist: "Hasan Raheem, Talwiinder, Umair",
    cover: "/player-assets/cover/wishes-cover.png",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: 180,
  },
  {
    id: 2,
    title: "Midnight Dreams",
    artist: "The Weeknd, Travis Scott",
    cover: "/midnight-music-album-cover.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: 195,
  },
  {
    id: 3,
    title: "Summer Vibes",
    artist: "Calvin Harris, Dua Lipa",
    cover: "/summer-vibes-music-album.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: 210,
  },
]

// -----------------------------
// useAudioPlayer Hook
// -----------------------------
function useAudioPlayer(playlist: Track[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const currentSong = playlist[currentSongIndex]

  useEffect(() => {
    audioRef.current = new Audio()
    const audio = audioRef.current

    if (currentSong) {
      audio.src = currentSong.audioUrl
      audio.load()
    }

    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current || !currentSong) return
    const audio = audioRef.current
    const wasPlaying = isPlaying

    audio.src = currentSong.audioUrl
    audio.load()

    if (wasPlaying) {
      audio.play().catch((err) => console.error("Playback failed:", err))
    }
  }, [currentSongIndex])

  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current

    const handleTimeUpdate = () => setCurrentTime(Math.floor(audio.currentTime))
    const handleLoadedMetadata = () => setDuration(Math.floor(audio.duration))
    const handleEnded = () => handleNext()
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
    }
  }, [currentSongIndex])

  const handlePlayPause = useCallback(() => {
    if (!audioRef.current) return

    if (isPlaying) audioRef.current.pause()
    else
      audioRef.current.play().catch((err) => {
        console.error("Playback failed:", err)
      })
  }, [isPlaying])

  const handleNext = useCallback(() => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length)
    setCurrentTime(0)
  }, [playlist.length])

  const handlePrev = useCallback(() => {
    if (currentTime > 3) {
      if (audioRef.current) audioRef.current.currentTime = 0
      setCurrentTime(0)
    } else {
      setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length)
      setCurrentTime(0)
    }
  }, [playlist.length, currentTime])

  const handleSeek = useCallback((time: number) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }, [])

  return {
    isPlaying,
    currentSong,
    currentTime,
    duration: duration || currentSong?.duration || 0,
    handlePlayPause,
    handleNext,
    handlePrev,
    handleSeek,
  }
}

// -----------------------------
// Main SpotifyPlayer Component
// -----------------------------
export default function MusicPlayer() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isChangingSong, setIsChangingSong] = useState(false)
  const { isPlaying, currentSong, currentTime, duration, handlePlayPause, handleNext, handlePrev, handleSeek } =
    useAudioPlayer(playlist)

  const progress = duration ? (currentTime / duration) * 100 : 0

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const handleNextWithAnimation = useCallback(() => {
    setIsChangingSong(true)
    setTimeout(() => {
      handleNext()
      setIsChangingSong(false)
    }, 200)
  }, [handleNext])

  const handlePrevWithAnimation = useCallback(() => {
    setIsChangingSong(true)
    setTimeout(() => {
      handlePrev()
      setIsChangingSong(false)
    }, 200)
  }, [handlePrev])

  return (
    <div className="relative w-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 40,
            mass: 1.2,
          }}
          onClick={() => !isExpanded && setIsExpanded(true)}
          className="relative flex-col py-1.5 pl-1.5 pr-2 items-center justify-between rounded-xl
          bg-[radial-gradient(85.03%_85.03%_at_50%_50%,_#585858_3.91%,_#7B7B7B_100%)]
          shadow-[0_7px_21px_0_rgba(0,0,0,0.30),0_-1.5px_0_0_#535252_inset,0_1px_0_0_#535252_inset,0_2px_0_0_#AFAFAF_inset]"
          style={{ cursor: isExpanded ? "default" : "pointer" }}
        >
          
          {/* Collapsed State */}
          {!isExpanded && (
            <motion.div
              key="collapsed"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex gap-6 w-full items-center justify-between"
            >
              <motion.div
                layoutId="album-cover"
                className="w-9 h-9 rounded-md p-[1px] bg-[#7E7E7E] overflow-clip shadow-lg border-[.25px] border-[#9D9D9D]"
              >
                <motion.img
                  key={currentSong.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  src={currentSong.cover || "/placeholder.svg"}
                  alt={currentSong.title}
                  className="w-full h-full object-center rounded-sm border-[.5px] border-[#A0A0A0]"
                />
              </motion.div>

              <motion.div layoutId="song-title" className="flex-1 min-w-0">
                <motion.h3
                  key={currentSong.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl font-medium text-white/80 truncate"
                >
                  {currentSong.title}
                </motion.h3>
              </motion.div>

              <motion.div layoutId="waveform" className="flex-shrink-0">
                <WaveformIcon isPlaying={isPlaying} size="sm" />
              </motion.div>
            </motion.div>
          )}

          {/* Expanded State */}
          {isExpanded && (
            <motion.div
              key="expanded"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              className="flex flex-col p-2 gap-6"
            >
              <motion.div
                layout
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="flex items-center justify-between gap-2"
              >
                <motion.div
                  layoutId="album-cover"
                  className="w-20 h-20 rounded-xl p-[2.5px] bg-[#7E7E7E] overflow-clip shadow-lg border-[.5px] border-[#9D9D9D]"
                >
                  <motion.img
                    key={currentSong.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    src={currentSong.cover || "/placeholder.svg"}
                    alt={currentSong.title}
                    className="w-full h-full object-center rounded-lg border-[1px] border-[#A0A0A0]"
                  />
                </motion.div>

                <motion.div
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="flex-1 min-w-0 flex flex-col justify-center"
                >
                  <motion.h2
                    layoutId="song-title"
                    key={currentSong.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4 }}
                    className="text-2xl font-medium  text-white/80 truncate mb-1"
                  >
                    {currentSong.title}
                  </motion.h2>
                  <motion.p
                    key={`${currentSong.id}-artist`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ delay: 0.05, duration: 0.3 }}
                    className="text-lg text-white/60 truncate"
                  >
                    {currentSong.artist}
                  </motion.p>
                </motion.div>
                <motion.div layoutId="waveform" className="flex-shrink-0">
                <WaveformIcon isPlaying={isPlaying} size="lg" />
              </motion.div>
              </motion.div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <Slider.Root
                  value={[currentTime]}
                  onValueChange={(value) => handleSeek(value[0])}
                  min={0}
                  max={duration || 0}
                  step={1}
                >
                  <Slider.Control className="flex w-full touch-none items-center py-3 select-none">
                    <Slider.Track className="h-1 w-full rounded-full bg-gray-200 shadow-[inset_0_0_0_1px] shadow-gray-200 select-none">
                      <Slider.Indicator className="rounded-full bg-gradient-to-r from-pink-500 to-red-500 select-none" />
                      <Slider.Thumb className="size-3 rounded-full bg-white outline outline-2 outline-pink-500 shadow-lg select-none has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-pink-600 transition-transform hover:scale-110" />
                    </Slider.Track>
                  </Slider.Control>
                </Slider.Root>
                
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mt-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrevWithAnimation}
                  className="w-16 h-16 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <SkipBack size={24} className="text-gray-700" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePlayPause}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center shadow-2xl hover:shadow-3xl transition-shadow"
                >
                  {isPlaying ? (
                    <Pause size={32} className="text-white" />
                  ) : (
                    <Play size={32} className="text-white ml-1" />
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNextWithAnimation}
                  className="w-16 h-16 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <SkipForward size={24} className="text-gray-700" />
                </motion.button>
              </div>

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200/80 hover:bg-gray-300/80 flex items-center justify-center transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// -----------------------------
// Waveform Animation Component
// -----------------------------
function WaveformIcon({ isPlaying, size = "sm" }: { isPlaying: boolean; size?: "sm" | "lg" }) {
  const bars = size === "sm" ? 4 : 8
  const barWidth = size === "sm" ? 2.5 : 3
  const maxHeight = size === "sm" ? 20 : 32
  const gap = size === "sm" ? 3 : 4

  return (
    <div className="flex items-center" style={{ gap }}>
      {Array.from({ length: bars }).map((_, i) => (
        <WaveBar key={i} isPlaying={isPlaying} maxHeight={maxHeight} width={barWidth} delay={i * 0.1} />
      ))}
    </div>
  )
}

function WaveBar({
  isPlaying,
  maxHeight,
  width,
  delay,
}: {
  isPlaying: boolean
  maxHeight: number
  width: number
  delay: number
}) {
  const controls = useAnimationControls()

  useEffect(() => {
    let active = true
    const loop = async () => {
      while (active) {
        const height = isPlaying ? maxHeight * (0.4 + Math.random() * 0.6) : maxHeight * 0.3
        await controls.start({
          height,
          transition: { duration: 0.4 + Math.random() * 0.3, ease: "easeInOut", delay },
        })
      }
    }
    loop()
    return () => {
      active = false
    }
  }, [isPlaying, controls, maxHeight, delay])

  return (
    <motion.div animate={controls} style={{ width, height: maxHeight * 0.3 }} 
    className="bg-white rounded-full
    shadow-[0_1px_2px_0_#8A8A8A_inset]" />
  )
}
