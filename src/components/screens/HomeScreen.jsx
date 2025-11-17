import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
function HomeScreen({
  onStart
}) {
  return <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div className="text-center space-y-10 sm:space-y-12">
        <motion.div initial={{
        scale: 0.8,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} transition={{
        duration: 0.6,
        ease: "easeOut"
      }}>
          <img src="https://horizons-cdn.hostinger.com/c69c4409-b4af-4a8b-a44c-35cce8d434d1/logo-2-hXija.jpg" alt="Kameraden Logo" className="w-64 sm:w-80 mx-auto rounded-lg shadow-2xl" />
        </motion.div>
        
        <h1 className="text-5xl sm:text-7xl font-extrabold text-white text-shadow">
          Kameraden
        </h1>
        
        <p className="text-lg sm:text-2xl text-white/90 max-w-md mx-auto">
          Leer je vrienden beter kennen door persoonlijke vragen te beantwoorden
        </p>

        <motion.div whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }}>
          <Button onClick={onStart} size="lg" className="bg-yellow-400 text-gray-800 hover:bg-yellow-500 text-xl sm:text-2xl px-10 sm:px-12 py-6 sm:py-8 rounded-full shadow-2xl font-bold">
            Nieuw Spel
          </Button>
        </motion.div>
      </div>
    </div>;
}
export default HomeScreen;