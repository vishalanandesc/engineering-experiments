'use client'

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useAnimationControls } from "motion/react"
import { Play, Pause, StepBack, StepForward, Shrink } from "lucide-react"
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
    artist: "Hasan Raheem, Talwiinder & Umair",
    cover: "/player-assets/cover/wishes-cover.png",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: 180,
  },
  {
    id: 2,
    title: "Victory Lap",
    artist: "Fred again.., Skepta & PlaqueBoyMax",
    cover: "/player-assets/cover/victorylap-cover.png",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: 195,
  },
  {
    id: 3,
    title: "DNA",
    artist: "Kendrick Lamar",
    cover: "/player-assets/cover/dna-cover.png",
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
  }, [playlist]) 
  
  const handlePrev = useCallback(() => {
    if (currentTime > 3) {
      if (audioRef.current) audioRef.current.currentTime = 0
      setCurrentTime(0)
    } else {
      setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length)
      setCurrentTime(0)
    }
  }, [playlist, currentTime])
  

  const handleSeek = useCallback((time: number) => {
    if (!audioRef.current) return
  
    const safeTime = Number(time)
    if (!isFinite(safeTime) || isNaN(safeTime)) return
  
    audioRef.current.currentTime = safeTime
    setCurrentTime(safeTime)
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
    
    <div>
      <button
        onClick={() => setIsExpanded(false)}
        className="absolute top-6 right-6 p-2 rounded-lg border border-gray-200 bg-white cursor-pointer 
        hover:bg-[#FAFAFA] transition-colors">
        <Shrink className="w-4 h-4" />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            width: isExpanded ? 420 : 220       
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
          bg-[radial-gradient(85.03%_85.03%_at_50%_50%,_#585858_3.91%,_#7B7B7B_100%)] outline outline-offset-[-2px]
          shadow-[0_7px_21px_0_rgba(0,0,0,0.30),0_-2px_0_0_#535252_inset,0_1px_0_0_#535252_inset,0_2px_0_0_#AFAFAF_inset]"
          style={{ cursor: isExpanded ? "default" : "pointer"}}>
          
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

                  <motion.h2
                    layoutId="song-title"
                    key={currentSong.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl text-center font-medium text-white/80 truncate"
                  >
                    {currentSong.title}
                  </motion.h2>
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
              className="flex items-center flex-col p-1.5 gap-6"
            >
              <motion.div
                layout
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="flex w-full items-center justify-between gap-2"
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
                  className="flex-1 flex-col justify-center"
                > 
                 <motion.div className="flex w-full items-center justify-between mb-1"> 
                  <motion.h2
                    layoutId="song-title"
                    key={currentSong.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl text-center font-medium text-white/80 truncate"
                  >
                    {currentSong.title}
                  </motion.h2>
                   <motion.div layoutId="waveform" className="flex-shrink-0">
                   <WaveformIcon isPlaying={isPlaying} size="lg" />
                  </motion.div>
                 </motion.div> 

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
               
              </motion.div>

              {/* Progress Bar */}
              <div className="w-full mt-1">
              <Slider.Root
                 value={[isFinite(currentTime) ? currentTime : 0]}
                 onValueChange={(value) => {
                   const seekTime = Array.isArray(value) ? Number(value[0]) : Number(value)
                   if (isFinite(seekTime) && !isNaN(seekTime)) handleSeek(seekTime)
                 }}
                 min={0}
                 max={isFinite(duration) && duration > 0 ? duration : 0}
                 step={1}>
                  <Slider.Control className="flex w-full touch-none items-center mb-3 select-none">
                    <Slider.Track className="h-2 w-full rounded-full bg-[#E5E5E5] shadow-[inset_0_2px_9px_0_#B9B7B7]">
                      <Slider.Indicator className="rounded-full bg-gradient-to-b from-[#FF4B76] to-[#A80027]"/> 
                        <Slider.Thumb className="w-1.5 h-3.5 rounded-full bg-white shadow-lg
                        has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[#A80027] has-[:focus-visible]:outline-offset-2 transition-transform hover:scale-110"/>
                    </Slider.Track>
                  </Slider.Control>
                </Slider.Root>
                <div className="flex items-center justify-between text-sm tabular-nums font-medium text-[#A6A6A6]">
                  <span className="select-none">{formatTime(currentTime)}</span>
                  <span className="select-none">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex w-fit items-center p-3 rounded-full justify-center 
              bg-[#7E7E7E] shadow-[0_1px_2px_0_#AFAFAF_inset] gap-12">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevWithAnimation}
                  className="group w-14 h-14 p-1.5 rounded-full bg-white border border-[#979797] cursor-pointer
                  flex items-center justify-center shadow-lg hover:shadow-none transition-shadow duration-150 ease-out">
                 <motion.div className="flex w-full h-full items-center justify-center rounded-full border-[.5px] border-[#C7C6C6]
                 bg-gradient-to-b from-[#D8D8D8] to [#F3F3F3] group-hover:bg-[#F3F3F3] group-hover:border-none transition-all duration-150 ease-out">
                  <StepBack size={24} className="text-[#979797] mr-0.5" />
                 </motion.div>   
                </motion.button>

                <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handlePlayPause}
                className="group w-20 h-20 p-2 rounded-full bg-white flex items-center justify-center 
                cursor-pointer shadow-md hover:shadow-none transition-shadow">
                <div className="flex w-full h-full items-center justify-center rounded-full border-[.5px] border-[#C7C6C6]
                  bg-gradient-to-b from-[#D8D8D8] to-[#F3F3F3] group-hover:bg-[#F3F3F3] group-hover:border-none transition-all duration-150 ease-out">

                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={isPlaying ? "pause" : "play"}
                      initial={{ opacity: 0, scale: 0.25, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.25, filter: "blur(10px)" }}
                      transition={{
                        type: "spring",
                        duration: 0.3,
                        bounce: 0,
                      }}>
                      {isPlaying ? (
                       <Pause fill="#979797" size={36} strokeWidth={0} />
                      ) : (
                        <Play fill="#979797" size={36} strokeWidth={0} className="ml-1" />
                      )}
                    </motion.div>
                   </AnimatePresence>
                  </div>
              </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextWithAnimation}
                  className="group w-14 h-14 p-1.5 rounded-full bg-white border border-[#979797] cursor-pointer
                  flex items-center justify-center shadow-lg hover:shadow-none transition-shadow duration-150 ease-out">
                 <motion.div className="flex w-full h-full items-center justify-center rounded-full border-[.5px] border-[#C7C6C6]
                 bg-gradient-to-b from-[#D8D8D8] to [#F3F3F3] group-hover:bg-[#F3F3F3] group-hover:border-none transition-all duration-150 ease-out">
                  <StepForward size={24} className="text-[#979797] ml-0.5"/>
                 </motion.div>   
                </motion.button>
              </div>
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
  const bars = size === "sm" ? 4 : 6
  const barWidth = size === "sm" ? 2.5 : 3
  const maxHeight = size === "sm" ? 20 : 28
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
