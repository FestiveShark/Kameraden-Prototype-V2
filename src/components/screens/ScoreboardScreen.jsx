import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy, Medal, Award, Home } from 'lucide-react';

function ScoreboardScreen({ scores, players, onNewGame }) {
  const sortedPlayers = [...players].sort((a, b) => (scores[b] || 0) - (scores[a] || 0));
  const winner = sortedPlayers[0];

  const getMedalIcon = (index) => {
    if (index === 0) return <Trophy className="w-7 h-7 text-yellow-400" />;
    if (index === 1) return <Medal className="w-7 h-7 text-gray-400" />;
    if (index === 2) return <Award className="w-7 h-7 text-orange-500" />;
    return <div className="w-7 h-7"></div>;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-8"
      >
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Trophy className="w-20 h-20 sm:w-24 sm:h-24 text-yellow-500 mx-auto" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800">Eindstand!</h2>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="text-2xl sm:text-3xl font-bold text-red-600"
          >
            🎉 {winner} wint! 🎉
          </motion.p>
        </div>

        <div className="space-y-3">
          {sortedPlayers.map((player, index) => (
            <motion.div
              key={player}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-xl shadow-md ${
                index === 0
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 text-gray-800'
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-2xl font-bold w-8 text-center">{index + 1}.</span>
                {getMedalIcon(index)}
                <span className="text-xl sm:text-2xl font-semibold">{player}</span>
              </div>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="text-2xl sm:text-3xl font-bold"
              >
                {scores[player] || 0}
              </motion.span>
            </motion.div>
          ))}
        </div>

        <div className="bg-orange-100 p-6 rounded-2xl">
          <p className="text-center text-gray-700">
            Bedankt voor het spelen van Kameraden! Jullie hebben elkaar beter leren kennen. 🎊
          </p>
        </div>

        <Button
          onClick={onNewGame}
          size="lg"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 text-xl py-6 sm:py-8"
        >
          <Home className="w-6 h-6 mr-2" />
          Nieuw Spel
        </Button>
      </motion.div>
    </div>
  );
}

export default ScoreboardScreen;