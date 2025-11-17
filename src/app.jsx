import { useState } from 'react';
import { Helmet } from 'react-helmet';
import HomeScreen from '@/components/screens/HomeScreen';
import SetupScreen1 from '@/components/screens/SetupScreen1';
import SetupScreen2 from '@/components/screens/SetupScreen2';
import SetupScreen3 from '@/components/screens/SetupScreen3';
import LevelScreen from '@/components/screens/LevelScreen';
import InputScreen from '@/components/screens/InputScreen';
import TimerScreen from '@/components/screens/TimerScreen';
import AnswerScreen from '@/components/screens/AnswerScreen';
import JuryScreen from '@/components/screens/JuryScreen';
import ScoreboardScreen from '@/components/screens/ScoreboardScreen';
import PlayerScoreScreen from '@/components/screens/PlayerScoreScreen';
import IntroRoundStart from '@/components/screens/IntroRoundStart';
import IntroRoundInput from '@/components/screens/IntroRoundInput';
import IntroRoundEnd from '@/components/screens/IntroRoundEnd';
import { Toaster } from '@/components/ui/toaster';
import { getRandomQuestion, questionsData } from '@/data/questions';

const initialAskedQuestions = () => ({
  vibing: [],
  diep: [],
  dieper: [],
  diepst: [],
});

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [players, setPlayers] = useState([]);
  const [timeLimit, setTimeLimit] = useState(30);
  const [totalRounds, setTotalRounds] = useState(3);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentKameraadIndex, setCurrentKameraadIndex] = useState(0);
  const [playersOrder, setPlayersOrder] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [kameraadAnswer, setKameraadAnswer] = useState('');
  const [scores, setScores] = useState({});
  const [introRoundEnabled, setIntroRoundEnabled] = useState(true);
  const [introKameraadIndex, setIntroKameraadIndex] = useState(0);
  const [askedQuestions, setAskedQuestions] = useState(initialAskedQuestions());

  const resetGame = () => {
    setCurrentScreen('home');
    setPlayers([]);
    setTimeLimit(30);
    setTotalRounds(3);
    setCurrentRound(1);
    setCurrentKameraadIndex(0);
    setPlayersOrder([]);
    setDifficulty('');
    setCurrentQuestion('');
    setKameraadAnswer('');
    setScores({});
    setIntroRoundEnabled(true);
    setIntroKameraadIndex(0);
    setAskedQuestions(initialAskedQuestions());
  };
  
  const getNewQuestion = (level, kameraadName) => {
    const questionText = getRandomQuestion(level, kameraadName, askedQuestions);
    const originalQuestion = questionsData.thirdPerson[level].find(q => q.replace(/{name}/g, kameraadName) === questionText);
    
    setAskedQuestions(prev => {
        const updatedAsked = { ...prev };
        if (originalQuestion && !updatedAsked[level].includes(originalQuestion)) {
            updatedAsked[level] = [...updatedAsked[level], originalQuestion];
        }
        return updatedAsked;
    });
    
    setCurrentQuestion(questionText);
  };

  const startMainGame = () => {
    setCurrentScreen('level');
  };

  const startNewRound = () => {
    if (currentRound < totalRounds) {
      setCurrentRound(currentRound + 1);
      setCurrentKameraadIndex(0);
      setCurrentQuestion('');
      setKameraadAnswer('');
      setCurrentScreen('level');
    } else {
      setCurrentScreen('scoreboard');
    }
  };

  const nextTurn = () => {
      if (difficulty === 'vibing') {
          nextIntroKameraad();
      } else {
          nextKameraad();
      }
  };

  const nextKameraad = () => {
    if (currentKameraadIndex < playersOrder.length - 1) {
      setCurrentKameraadIndex(currentKameraadIndex + 1);
      setCurrentQuestion('');
      setKameraadAnswer('');
      setCurrentScreen('level');
    } else {
      startNewRound();
    }
  };
  
  const nextIntroKameraad = () => {
    if (introKameraadIndex < playersOrder.length - 1) {
      setIntroKameraadIndex(introKameraadIndex + 1);
      setCurrentQuestion('');
      setKameraadAnswer('');
      setCurrentScreen('intro-input');
    } else {
      setCurrentScreen('intro-end');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onStart={() => setCurrentScreen('setup1')} />;
      case 'setup1':
        return (
          <SetupScreen1
            players={players}
            setPlayers={setPlayers}
            onNext={() => setCurrentScreen('setup2')}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'setup2':
        return (
          <SetupScreen2
            onNext={() => setCurrentScreen('setup3')}
            onBack={() => setCurrentScreen('setup1')}
          />
        );
      case 'setup3':
        return (
          <SetupScreen3
            timeLimit={timeLimit}
            setTimeLimit={setTimeLimit}
            totalRounds={totalRounds}
            setTotalRounds={setTotalRounds}
            players={players}
            introRoundEnabled={introRoundEnabled}
            setIntroRoundEnabled={setIntroRoundEnabled}
            onNext={() => {
              const shuffled = [...players].sort(() => Math.random() - 0.5);
              setPlayersOrder(shuffled);
              const initialScores = {};
              players.forEach(player => {
                initialScores[player] = 0;
              });
              setScores(initialScores);
              setAskedQuestions(initialAskedQuestions());
              setCurrentScreen(introRoundEnabled ? 'intro-start' : 'level');
            }}
            onBack={() => setCurrentScreen('setup2')}
          />
        );
      case 'intro-start':
        return (
          <IntroRoundStart
            onStart={() => setCurrentScreen('intro-input')}
            onSkip={startMainGame}
          />
        );
      case 'intro-input':
        return (
          <IntroRoundInput
            currentKameraad={playersOrder[introKameraadIndex]}
            currentQuestion={currentQuestion}
            getNewQuestion={(level, name) => getNewQuestion(level, name)}
            kameraadAnswer={kameraadAnswer}
            setKameraadAnswer={setKameraadAnswer}
            onNext={() => {
              setDifficulty('vibing');
              setCurrentScreen('timer');
            }}
          />
        );
       case 'intro-end':
        return <IntroRoundEnd onStart={startMainGame} />;
      case 'level':
        return (
          <LevelScreen
            currentKameraad={playersOrder[currentKameraadIndex]}
            currentRound={currentRound}
            totalRounds={totalRounds}
            onSelectLevel={(level) => {
              setDifficulty(level);
              setCurrentScreen('input');
            }}
          />
        );
      case 'input':
        return (
          <InputScreen
            currentKameraad={playersOrder[currentKameraadIndex]}
            difficulty={difficulty}
            currentQuestion={currentQuestion}
            getNewQuestion={(level, name) => getNewQuestion(level, name)}
            kameraadAnswer={kameraadAnswer}
            setKameraadAnswer={setKameraadAnswer}
            onNext={() => setCurrentScreen('timer')}
          />
        );
      case 'timer':
        return (
          <TimerScreen
            timeLimit={timeLimit}
            currentKameraad={difficulty === 'vibing' ? playersOrder[introKameraadIndex] : playersOrder[currentKameraadIndex]}
            currentQuestion={currentQuestion}
            onComplete={() => setCurrentScreen('answer')}
          />
        );
      case 'answer':
        return (
          <AnswerScreen
            currentKameraad={difficulty === 'vibing' ? playersOrder[introKameraadIndex] : playersOrder[currentKameraadIndex]}
            kameraadAnswer={kameraadAnswer}
            currentQuestion={currentQuestion}
            onNext={() => setCurrentScreen('jury')}
          />
        );
      case 'jury':
        return (
          <JuryScreen
            players={players}
            currentKameraad={difficulty === 'vibing' ? playersOrder[introKameraadIndex] : playersOrder[currentKameraadIndex]}
            difficulty={difficulty}
            scores={scores}
            setScores={setScores}
            onNext={() => setCurrentScreen('player-score')}
          />
        );
      case 'player-score':
        return (
            <PlayerScoreScreen
                scores={scores}
                players={players}
                onNext={nextTurn}
            />
        );
      case 'scoreboard':
        return (
          <ScoreboardScreen
            scores={scores}
            players={players}
            onNewGame={resetGame}
          />
        );
      default:
        return <HomeScreen onStart={() => setCurrentScreen('setup1')} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Kameraden</title>
        <meta name="description" content="Play Kameraden, an engaging Dutch language game where players guess answers to personal questions" />
      </Helmet>
      <div className="min-h-screen">
        {renderScreen()}
        <Toaster />
      </div>
    </>
  );
}

export default App;