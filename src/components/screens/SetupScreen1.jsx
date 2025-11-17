import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

function SetupScreen1({ players, setPlayers, onNext, onBack }) {
  const [newPlayer, setNewPlayer] = useState('');
  const { toast } = useToast();

  const addPlayer = () => {
    if (newPlayer.trim() === '') {
      toast({
        title: 'Voer een naam in',
        description: 'De naam mag niet leeg zijn',
        variant: 'destructive',
      });
      return;
    }
    if (players.includes(newPlayer.trim())) {
      toast({
        title: 'Naam bestaat al',
        description: 'Deze speler is al toegevoegd',
        variant: 'destructive',
      });
      return;
    }
    setPlayers([...players, newPlayer.trim()]);
    setNewPlayer('');
  };

  const removePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (players.length < 3) {
      toast({
        title: 'Niet genoeg spelers',
        description: 'Je hebt minimaal 3 spelers nodig',
        variant: 'destructive',
      });
      return;
    }
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-red-600">Spelers Toevoegen</h2>
        
        <p className="text-center text-gray-600">Minimaal 3 spelers nodig</p>

        <div className="flex gap-3">
          <Input
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
            placeholder="Naam van speler"
            className="flex-1 text-lg py-6"
          />
          <Button
            onClick={addPlayer}
            className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6"
            size="lg"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        <div className="space-y-3 max-h-60 sm:max-h-96 overflow-y-auto p-1">
          {players.map((player, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between bg-blue-100 p-3 sm:p-4 rounded-xl"
            >
              <span className="text-lg sm:text-xl font-semibold text-gray-800">{player}</span>
              <Button
                onClick={() => removePlayer(index)}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-100"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </motion.div>
          ))}
        </div>

        {players.length === 0 && (
          <p className="text-center text-gray-400 py-8">Nog geen spelers toegevoegd</p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
            onClick={handleNext}
            size="lg"
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-lg py-6"
          >
            Volgende
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default SetupScreen1;