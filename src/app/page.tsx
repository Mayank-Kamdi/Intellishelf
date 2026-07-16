'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingHero from '@/components/landing/LandingHero';
import LoadingScreen from '@/components/loading/LoadingScreen';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <main className="relative min-h-screen w-full bg-[#DFD0B8] overflow-hidden flex flex-col justify-center">
        {/* Landing UI text and inputs */}
        <LandingHero />
      </main>
    </>
  );
}
