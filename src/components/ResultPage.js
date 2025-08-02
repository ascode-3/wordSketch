import React from 'react';
import './ResultPage.css';

function ResultPage({ result, onRestart }) {
  return (
    <div className="result-page">
      <h1>결과</h1>
      <p>{result}</p>
      <button onClick={onRestart}>다시 시작</button>
    </div>
  );
}

export default ResultPage;
