import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Clock, Target, Sparkles, ToggleLeft, ToggleRight } from 'lucide-react';

function SetupScreen3({ timeLimit, setTimeLimit, totalRounds, setTotalRounds, players, introRoundEnabled, setIntroRoundEnabled, onNext, onBack }) {
  const timeOptions = [30, 45, 60];
  const roundOptions = [1, 2, 3, 4, 5];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 space-y-8"
      >
        <h2 className="text-4xl font-bold text-center text-red-600">Spel Instellingen</h2>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-red-500" />
              <h3 className="text-2xl font-semibold text-gray-800">Tijd per Vraag</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {timeOptions.map((time) => (
                <motion.button
                  key={time}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTimeLimit(time)}
                  className={`py-6 rounded-xl text-xl font-bold transition-all ${
                    timeLimit === time
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {time}s
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-red-500" />
              <h3 className="text-2xl font-semibold text-gray-800">Vibing Ronde</h3>
            </div>
            <button
              onClick={() => setIntroRoundEnabled(!introRoundEnabled)}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                introRoundEnabled ? 'bg-green-100' : 'bg-gray-100'
              }`}
            >
              <span className={`font-semibold ${introRoundEnabled ? 'text-green-800' : 'text-gray-700'}`}>
                {introRoundEnabled ? 'Opwarmronde is ingeschakeld' : 'Opwarmronde is uitgeschakeld'}
              </span>
              {introRoundEnabled ? <ToggleRight className="w-10 h-10 text-green-600" /> : <ToggleLeft className="w-10 h-10 text-gray-400" />}
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-red-500" />
              <h3 className="text-2xl font-semibold text-gray-800">Aantal Rondes</h3>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {roundOptions.map((round) => (
                <motion.button
                  key={round}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTotalRounds(round)}
                  className={`py-6 rounded-xl text-xl font-bold transition-all ${
                    totalRounds === round
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {round}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-2xl">
            <p className="text-center text-gray-700">
              <span className="font-bold">{players.length} spelers</span> × <span className="font-bold">{totalRounds} rondes</span> = <span className="font-bold text-red-600">{players.length * totalRounds} hoofdvragen</span>
            </p>
            <p className="text-center text-gray-600 text-sm mt-2">
              Elke speler is {totalRounds}× de Kameraad in het hoofdspel.
            </p>
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
            Start Spel
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default SetupScreen3;