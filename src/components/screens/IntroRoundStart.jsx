import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Play, SkipForward } from 'lucide-react';

function IntroRoundStart({ onStart, onSkip }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#2A4E38]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 text-center space-y-8"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Sparkles className="w-20 h-20 text-yellow-500 mx-auto" />
        </motion.div>

        <h1 className="text-4xl font-bold text-red-600">Vibing Ronde!</h1>

        <p className="text-lg text-gray-700 max-w-lg mx-auto">
          Laten we opwarmen met een snelle, luchtige ronde. Iedereen is één keer de Kameraad om de sfeer erin te krijgen voordat we de diepte in duiken.
        </p>
        
        <div className="bg-blue-100 p-4 rounded-xl">
            <p className="font-semibold text-blue-800">Kameraad: 5 punten (vast)</p>
            <p className="font-semibold text-blue-800">Gokkers: 5 punten (te verdelen)</p>
        </div>


        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            onClick={onStart}
            size="lg"
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-lg py-6"
          >
            <Play className="w-6 h-6 mr-2" />
            Start de Opwarming
          </Button>
        </div>
        <Button
            onClick={onSkip}
            variant="ghost"
            size="lg"
            className="w-full text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          >
            <SkipForward className="w-5 h-5 mr-2" />
            Sla vibing ronde over, ga de diepte in
          </Button>
      </motion.div>
    </div>
  );
}

export default IntroRoundStart;