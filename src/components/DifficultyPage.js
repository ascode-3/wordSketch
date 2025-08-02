import React from 'react';
import './DifficultyPage.css';

const difficultyLevels = [
  { id: 'easy', label: '쉬움', description: '기초 단어로 시작해요' },
  { id: 'medium', label: '보통', description: '일상적인 표현을 배워요' },
  { id: 'hard', label: '어려움', description: '고급 표현에 도전해요' }
];

function DifficultyPage({ onSelectDifficulty }) {
  return (
    <div className="difficulty-page">
      <h1>난이도를 선택하세요</h1>
      <div className="buttons">
        {difficultyLevels.map((level) => (
          <button 
            key={level.id} 
            className="difficulty-button"
            onClick={() => onSelectDifficulty(level.id)}
          >
            <span className="difficulty-label">{level.label}</span>
            <span className="difficulty-description">{level.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default DifficultyPage;
