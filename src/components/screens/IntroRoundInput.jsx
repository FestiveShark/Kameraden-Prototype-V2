import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

function IntroRoundInput({
  currentKameraad,
  currentQuestion,
  getNewQuestion,
  kameraadAnswer,
  setKameraadAnswer,
  onNext,
}) {
  const { toast } = useToast();

  useEffect(() => {
    if (!currentQuestion) {
      getNewQuestion('vibing', currentKameraad);
    }
  }, [currentKameraad, currentQuestion, getNewQuestion]);

  const handleNext = () => {
    if (kameraadAnswer.trim() === '') {
      toast({
        title: 'Leeg antwoord',
        description: 'Je moet een antwoord invullen.',
        variant: 'destructive',
      });
      return;
    }
    onNext();
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 space-y-8"
      >
        <div className="text-center space-y-2">
          <p className="text-gray-500 text-lg">Vibing Ronde</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Hey <span className="text-red-500">{currentKameraad}</span>!
          </h2>
          <p className="text-lg text-gray-600">Beantwoord de volgende vraag:</p>
        </div>

        <div className="bg-orange-100 p-6 rounded-2xl text-center space-y-4">
          <p className="text-xl font-medium text-gray-800">{currentQuestion}</p>
        </div>

        <div className="space-y-4">
          <label htmlFor="kameraad-answer" className="text-lg font-semibold text-gray-700">
            Jouw antwoord:
          </label>
          <Textarea
            id="kameraad-answer"
            value={kameraadAnswer}
            onChange={(e) => setKameraadAnswer(e.target.value)}
            placeholder="Schrijf hier je antwoord..."
            className="text-lg min-h-[120px] p-4"
          />
          <p className="text-sm text-gray-500">De andere spelers zien dit antwoord nog niet.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            onClick={handleNext}
            size="lg"
            className="w-full bg-red-500 hover:bg-red-600 text-white text-lg py-6"
          >
            Vergrendel Antwoord
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default IntroRoundInput;