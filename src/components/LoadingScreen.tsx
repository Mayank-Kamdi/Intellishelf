'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Customize the words shown during loading here
const words = ['.....', 'hello', 'welcome in']

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [startTyping, setStartTyping] = useState(false)

  useEffect(() => {
    // Start typing immediately
    const t = setTimeout(() => setStartTyping(true), 0)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!startTyping) return

    const currentWord = words[wordIdx]
    
    // If we've finished all words in the sequence
    if (!currentWord) {
      // Small pause after the last word finishes typing before closing/exiting
      const exitTimeout = setTimeout(() => {
        onComplete()
      }, 500)
      return () => clearTimeout(exitTimeout)
    }

    // Type character by character
    if (charIdx < currentWord.length) {
      const timer = setTimeout(() => {
        setText(currentWord.slice(0, charIdx + 1))
        setCharIdx(charIdx + 1)
      }, 90)
      return () => clearTimeout(timer)
    } else {
      // Current word is fully typed. Wait 500ms, then reset to empty and move to next word
      const pauseTimer = setTimeout(() => {
        setText('')
        setCharIdx(0)
        setWordIdx(wordIdx + 1)
      }, 500)
      return () => clearTimeout(pauseTimer)
    }
  }, [charIdx, wordIdx, startTyping, onComplete])

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#1c1b19', // Warm dark charcoal background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          fontSize: '21px',
          fontFamily: 'monospace',
          fontWeight: 300,
          whiteSpace: 'pre',
          color: '#fffcf5', // Cream/off-white text
          letterSpacing: '0.02em',
        }}
      >
        ({text})
      </div>
    </motion.div>
  )
}
