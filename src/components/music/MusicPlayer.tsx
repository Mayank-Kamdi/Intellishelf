'use client'

import { useEffect, useRef, useState } from 'react'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Stable public ambient MP3 track representing "Dancing in Code"
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')
    audio.loop = true
    audio.volume = 0.3
    audioRef.current = audio

    // Attempt to autoplay on mount
    const playAttempt = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          console.log('Autoplay blocked. Waiting for first user interaction.')
        })
    }

    playAttempt()

    // Fallback interaction handler to trigger autoplay as soon as user interacts
    const handleFirstInteraction = () => {
      if (audio.paused && !isPlaying) {
        playAttempt()
      }
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }

    window.addEventListener('click', handleFirstInteraction)
    window.addEventListener('keydown', handleFirstInteraction)

    return () => {
      audio.pause()
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(err => console.error('Play failed:', err))
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontFamily: 'var(--font-space-grotesk), var(--font-inter), sans-serif',
        fontSize: '0.8rem',
      }}
    >
      <button
        onClick={togglePlay}
        style={{
          background: 'none',
          border: '1px solid rgba(60, 45, 61, 0.4)',
          color: '#3c2d3d',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          outline: 'none',
          padding: 0,
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
        }}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          // Pause Icon
          <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
            <rect x="1" width="3" height="12" />
            <rect x="6" width="3" height="12" />
          </svg>
        ) : (
          // Play Icon
          <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" style={{ marginLeft: '2px' }}>
            <polygon points="1,0 9,6 1,12" />
          </svg>
        )}
      </button>
    </div>
  )
}
