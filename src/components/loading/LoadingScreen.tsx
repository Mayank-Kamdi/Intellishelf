'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const steps = [
  ".....",
  "Hello",
  "Welcome In",
  "Where ideas become reality."
]

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04, // Speed of typing
    }
  }
}

const letterVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
}

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [stepIdx, setStepIdx] = useState(-1) // Start at -1 for the initial 300ms delay

  useEffect(() => {
    // Initial 150ms pause before showing the first message
    const initialTimer = setTimeout(() => {
      setStepIdx(0)
    }, 150)

    return () => clearTimeout(initialTimer)
  }, [])

  useEffect(() => {
    if (stepIdx < 0 || stepIdx >= steps.length) return

    // 1.2s for steps 0–2, 1.5s for last step
    const delay = stepIdx === steps.length - 1 ? 1500 : 1200

    const transitionTimer = setTimeout(() => {
      if (stepIdx < steps.length - 1) {
        setStepIdx(stepIdx + 1)
      } else {
        onComplete()
      }
    }, delay)

    return () => clearTimeout(transitionTimer)
  }, [stepIdx, onComplete])

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#FFFBE9', // Warm cream background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AnimatePresence mode="wait">
        {stepIdx >= 0 && stepIdx < steps.length && (
          <motion.h1
            key={stepIdx}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-space-grotesk), var(--font-inter), sans-serif',
              fontSize: '2.5rem',
              fontWeight: 500,
              color: '#3d1a0e', // Deep warm brownish-charcoal text
              textAlign: 'center',
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              padding: '0 20px',
            }}
          >
            {steps[stepIdx].split(" ").map((word, wordIdx) => (
              <span key={wordIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {word.split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    variants={letterVariants}
                    style={{ display: 'inline-block' }}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordIdx < steps[stepIdx].split(" ").length - 1 && (
                  <span style={{ display: 'inline-block' }}>&nbsp;</span>
                )}
              </span>
            ))}
          </motion.h1>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
