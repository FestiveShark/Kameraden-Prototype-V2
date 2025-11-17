import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Plus, Minus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

function JuryScreen({ players, currentKameraad, difficulty, scores, setScores, onNext }) {
  const otherPlayers = useMemo(() => players.filter(p => p !== currentKameraad), [players, currentKameraad]);
  const [playerPoints, setPlayerPoints] = useState(() => 
    otherPlayers.reduce((acc, player) => ({ ...acc, [player]: 0 }), {})
  );
  const { toast } = useToast();

  const pointsConfig = {
    vibing: { kameraad: 5, distribution: 5 },
    diep: { kameraad: 5, distribution: 10 },
    dieper: { kameraad: 7, distribution: 15 },
    diepst: { kameraad: 10, distribution: 20 },
  };

  const currentConfig = pointsConfig[difficulty] || pointsConfig.diep;
  const kameraadPoints = currentConfig.kameraad;
  const totalPointsToDistribute = currentConfig.distribution;

  const allocatedPoints = useMemo(() => Object.values(playerPoints).reduce((sum, points) => sum + points, 0), [playerPoints]);
  
  const canProceed = allocatedPoints === totalPointsToDistribute;

  const handlePointChange = (player, amount) => {
    const currentPoints = playerPoints[player];
    const newPoints = currentPoints + amount;

    if (newPoints < 0) return;
    if (allocatedPoints + amount > totalPointsToDistribute && amount > 0) {
      toast({
        title: 'Limiet bereikt',
        description: `Je kunt maximaal ${totalPointsToDistribute} punten verdelen.`,
        variant: 'destructive',
      });
      return;
    }

    setPlayerPoints(prev => ({ ...prev, [player]: newPoints }));
  };

  const handleNext = () => {
    if (!canProceed) {
        toast({
            title: 'Nog niet klaar',
            description: `Je moet precies ${totalPointsToDistribute} punten verdelen.`,
            variant: 'destructive',
        });
        return;
    }

    const newScores = { ...scores };

    // Add points for guessing players
    for (const player in playerPoints) {
      if (playerPoints[player] > 0) {
        newScores[player] = (newScores[player] || 0) + playerPoints[player];
      }
    }

    // Add fixed points for the Kameraad
    newScores[currentKameraad] = (newScores[currentKameraad] || 0) + kameraadPoints;

    setScores(newScores);
    
    toast({
      title: 'Punten toegekend!',
      description: `${currentKameraad} kreeg ${kameraadPoints} punten. Er zijn ${allocatedPoints} punten verdeeld.`,
    });

    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="text-center space-y-2">
          <Award className="w-16 h-16 text-yellow-500 mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Punten Verdelen!</h2>
        </div>

        <div className="bg-blue-100 p-4 rounded-2xl space-y-2 text-center">
          <p className="text-gray-700 text-lg">
            <span className="font-bold">{currentKameraad}</span> (de Kameraad) krijgt
          </p>
          <p className="font-bold text-blue-600 text-3xl">{kameraadPoints} punten</p>
        </div>

        <div className="bg-orange-100 p-4 rounded-2xl space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800">Verdeel de punten voor de gokkers</h3>
            <p className="text-gray-600">Je moet precies <span className="font-bold">{totalPointsToDistribute}</span> punten verdelen</p>
            <p className="text-gray-600 font-bold text-lg mt-1">{allocatedPoints} / {totalPointsToDistribute} verdeeld</p>
          </div>
          <div className="space-y-3">
            {otherPlayers.map((player) => (
              <div key={player} className="flex items-center justify-between bg-white p-3 rounded-lg shadow">
                <span className="text-lg font-semibold text-gray-800">{player}</span>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="outline" className="w-8 h-8 rounded-full" onClick={() => handlePointChange(player, -1)}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-xl font-bold w-8 text-center">{playerPoints[player]}</span>
                  <Button size="icon" className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600" onClick={() => handlePointChange(player, 1)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button 
            onClick={handleNext} 
            size="lg" 
            className="w-full bg-red-500 hover:bg-red-600 text-white text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canProceed}
          >
            Bekijk Scores
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default JuryScreen;