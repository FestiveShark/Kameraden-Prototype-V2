import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Waves } from 'lucide-react';

function LevelScreen({
  currentKameraad,
  currentRound,
  totalRounds,
  onSelectLevel,
}) {
  const levels = [{
    id: 'diep',
    label: 'Verkenning',
    subtitle: '5 punten',
    color: 'from-blue-400 to-blue-600'
  }, {
    id: 'dieper',
    label: 'Verdieping',
    subtitle: '7 punten',
    color: 'from-indigo-500 to-purple-600'
  }, {
    id: 'diepst',
    label: 'Verbinding',
    subtitle: '10 punten',
    color: 'from-purple-600 to-pink-600'
  }];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.5 }} 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 space-y-8"
      >
        <div className="text-center space-y-2">
          <p className="text-gray-500 text-lg">Ronde {currentRound} van {totalRounds}</p>
          <h2 className="text-4xl font-bold text-red-600">Hoe diep gaan we?</h2>
          <p className="text-2xl text-gray-700 mt-4">
            <span className="font-bold text-red-500">{currentKameraad}</span> is de Kameraad
          </p>
        </div>

        <div className="flex justify-center">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <Waves className="w-20 h-20 text-blue-500" />
          </motion.div>
        </div>

        <div className="space-y-4">
          {levels.map((level, index) => (
            <motion.div key={level.id} initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.1 }}>
              <Button 
                onClick={() => onSelectLevel(level.id)} 
                className={`w-full py-8 text-2xl font-bold bg-gradient-to-r ${level.color} text-white hover:opacity-90 transition-all shadow-lg hover:shadow-xl h-24`}
              >
                <div className="flex flex-col items-center justify-center w-full">
                  <span>{level.label}</span>
                  <span className="text-base font-normal opacity-80 mt-1">{level.subtitle}</span>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-2xl">
          <p className="text-center text-gray-700 text-sm">
            Hoe moeilijker de vraag, hoe meer punten de Kameraad kan verdienen!
          </p>
        </div>
      </motion.div>
    </div>
  );
}
export default LevelScreen;