import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, PenTool } from 'lucide-react';

function SetupScreen2({ onNext, onBack }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 space-y-8"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex justify-center"
        >
          <PenTool className="w-24 h-24 text-red-500" />
        </motion.div>

        <h2 className="text-4xl font-bold text-center text-red-600">Schrijfmateriaal Klaar?</h2>
        
        <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-2xl">
          <p className="text-xl text-gray-700 text-center leading-relaxed">
            Zorg ervoor dat elke speler pen en papier heeft om de antwoorden op te schrijven tijdens het spel.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
            <p className="text-gray-700">Elke speler schrijft zijn/haar gok op</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
            <p className="text-gray-700">De Kameraad onthult het echte antwoord</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
            <p className="text-gray-700">Punten worden toegekend voor goede gokken</p>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            onClick={onBack}
            variant="outline"
            size="lg"
            className="flex-1 text-lg py-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Terug
          </Button>
          <Button
            onClick={onNext}
            size="lg"
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-lg py-6"
          >
            Klaar!
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default SetupScreen2;