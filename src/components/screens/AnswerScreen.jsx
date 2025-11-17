import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Eye } from 'lucide-react';

function AnswerScreen({ currentKameraad, kameraadAnswer, currentQuestion, onNext }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-8"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Het Echte Antwoord!</h2>
        </div>

        <div className="space-y-4">
          <div className="bg-orange-100 p-4 sm:p-6 rounded-2xl">
            <p className="text-sm text-gray-600 mb-2">Vraag:</p>
            <p className="text-base sm:text-lg text-gray-800 font-medium">
              {currentQuestion}
            </p>
          </div>

          <div className="bg-red-600 p-6 sm:p-8 rounded-2xl text-white min-h-[150px] flex flex-col justify-center">
            <p className="text-sm opacity-90 mb-3">
              <span className="font-bold">{currentKameraad}</span> antwoordde:
            </p>
            {revealed ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl sm:text-2xl font-bold leading-relaxed"
              >
                {kameraadAnswer}
              </motion.p>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setRevealed(true)}
                  className="bg-white text-red-600 hover:bg-gray-100 w-full py-6 text-lg"
                >
                  <Eye className="w-6 h-6 mr-2" />
                  Onthul Antwoord
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        <div className="bg-blue-100 p-4 sm:p-6 rounded-2xl">
          <p className="text-center text-gray-700">
            Vergelijk nu je gok met het echte antwoord. De jury zal punten toekennen!
          </p>
        </div>

        <Button
          onClick={onNext}
          disabled={!revealed}
          size="lg"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 text-lg sm:text-xl py-6 sm:py-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Naar Jury
          <ArrowRight className="w-6 h-6 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}

export default AnswerScreen;