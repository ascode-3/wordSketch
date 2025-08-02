import React, { useState } from 'react';
import DifficultyPage from './components/DifficultyPage';
import WordComposePage from './components/WordComposePage';
import ResultPage from './components/ResultPage';
import './App.css';

function App() {
  const [page, setPage] = useState('difficulty'); // 'difficulty' | 'compose' | 'result'
  const [difficulty, setDifficulty] = useState(null);
  const [result, setResult] = useState(null);

  const handleSelectDifficulty = (level) => {
    setDifficulty(level);
    setPage('compose');
  };

  const handleComposeComplete = (data) => {
    setResult(data);
    setPage('result');
  };

  const handleRestart = () => {
    setDifficulty(null);
    setResult(null);
    setPage('difficulty');
  };

  return (
    <div className="App">
      {page === 'difficulty' && (
        <DifficultyPage onSelectDifficulty={handleSelectDifficulty} />
      )}
      {page === 'compose' && (
        <WordComposePage difficulty={difficulty} onComplete={handleComposeComplete} />
      )}
      {page === 'result' && (
        <ResultPage result={result} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
