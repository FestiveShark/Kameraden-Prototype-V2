import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, HelpCircle } from 'lucide-react';

function InputScreen({ currentKameraad, difficulty, currentQuestion, getNewQuestion, kameraadAnswer, setKameraadAnswer, onNext }) {
  useEffect(() => {
    if (!currentQuestion) {
      getNewQuestion(difficulty, currentKameraad);
    }
  }, [currentQuestion, difficulty, currentKameraad, getNewQuestion]);

  const difficultyColors = {
    diep: 'from-blue-400 to-blue-600',
    dieper: 'from-indigo-500 to-purple-600',
    diepst: 'from-purple-600 to-pink-600',
  };

  const difficultyLabels = {
    diep: 'Verkenning',
    dieper: 'Verdieping',
    diepst: 'Verbinding',
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 space-y-6"
      >
        <div className="text-center space-y-2">
          <div className={`inline-block px-6 py-2 rounded-full bg-gradient-to-r ${difficultyColors[difficulty]} text-white font-bold text-lg`}>
            {difficultyLabels[difficulty]}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mt-4">
            <span className="text-red-500">{currentKameraad}</span>, beantwoord deze vraag:
          </h2>
        </div>

        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-2xl"
        >
          <div className="flex items-start gap-4">
            <HelpCircle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <p className="text-xl text-gray-800 leading-relaxed">
              {currentQuestion}
            </p>
          </div>
        </motion.div>

        <div className="space-y-3">
          <label className="text-lg font-semibold text-gray-700">Jouw Antwoord:</label>
          <Textarea
            value={kameraadAnswer}
            onChange={(e) => setKameraadAnswer(e.target.value)}
            placeholder="Typ hier je antwoord..."
            className="min-h-32 text-lg resize-none"
          />
          <p className="text-sm text-gray-500">
            Andere spelers zullen proberen je antwoord te raden!
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            onClick={onNext}
            disabled={!kameraadAnswer.trim()}
            size="lg"
            className="w-full bg-red-500 hover:bg-red-600 text-white text-lg py-6 disabled:opacity-50"
          >
            Start Timer
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default InputScreen;