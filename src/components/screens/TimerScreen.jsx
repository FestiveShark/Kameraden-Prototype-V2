import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';

function TimerScreen({ timeLimit, currentKameraad, currentQuestion, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const progress = (timeLeft / timeLimit) * 100;
  const isWarning = timeLeft <= 10;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-[#2A4E38]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-8 w-full max-w-md"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Timer className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto ${isWarning ? 'text-yellow-300' : 'text-white'}`} />
        </motion.div>

        <div className="space-y-4">
          <p className="text-xl sm:text-2xl text-white/90">
            Andere spelers schrijven hun gok op...
          </p>
          <div className="bg-white/10 p-4 rounded-xl text-white/80">
            <p className="text-sm">Vraag over <span className="font-bold">{currentKameraad}</span>:</p>
            <p className="font-semibold mt-1">{currentQuestion}</p>
          </div>
        </div>

        <motion.div
          animate={isWarning ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: isWarning ? Infinity : 0 }}
          className={`text-8xl sm:text-9xl font-bold ${isWarning ? 'text-yellow-300' : 'text-white'} text-shadow`}
        >
          {timeLeft}
        </motion.div>

        <div className="w-full mx-auto bg-white/20 rounded-full h-6 overflow-hidden backdrop-blur-sm">
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            className={`h-full ${isWarning ? 'bg-yellow-300' : 'bg-white'} transition-colors`}
          />
        </div>

        <p className="text-white/70 text-base sm:text-lg">
          Schrijf je gok op voordat de tijd om is!
        </p>

        <Button
          onClick={onComplete}
          variant="outline"
          className="bg-white/10 text-white hover:bg-white/20 border-white/30"
        >
          <SkipForward className="w-5 h-5 mr-2" />
          Timer overslaan
        </Button>
      </motion.div>
    </div>
  );
}

export default TimerScreen;