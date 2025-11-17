import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Rocket, Play } from 'lucide-react';

function IntroRoundEnd({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#2A4E38]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 text-center space-y-8"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Rocket className="w-20 h-20 text-red-500 mx-auto" />
        </motion.div>

        <h1 className="text-4xl font-bold text-red-600">Ronde 1</h1>

        <p className="text-lg text-gray-700 max-w-lg mx-auto">
          De opwarming is voorbij! Nu begint het echte spel. Maak je klaar om de diepte in te gaan en je vrienden écht te leren kennen.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            onClick={onStart}
            size="lg"
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-lg py-6"
          >
            <Play className="w-6 h-6 mr-2" />
            Start het Spel
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default IntroRoundEnd;