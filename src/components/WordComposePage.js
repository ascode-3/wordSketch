import React, { useEffect, useMemo, useState } from 'react';
import './WordComposePage.css';

// 단어 풀 (한국어)
const WORD_POOL = [
  '사과', '바나나', '고양이', '강아지', '학교', '선생님', '학생', '컴퓨터', '의자', '책상',
  '자동차', '비행기', '기차', '자전거', '물', '불', '공기', '땅', '하늘', '별',
  '꽃', '나무', '산', '바다', '강', '호수', '새', '물고기', '개미', '나비',
  '사랑', '행복', '슬픔', '기쁨', '화남', '놀람', '두려움', '용기', '희망', '꿈',
  '음식', '밥', '국', '김치', '라면', '피자', '햄버거', '과자', '아이스크림', '커피'
];

// 난이도별 단어 개수
const WORD_COUNT = {
  easy: 3,   // 쉬움: 3개 단어
  medium: 5, // 보통: 5개 단어
  hard: 7    // 어려움: 7개 단어
};

function WordComposePage({ difficulty, onComplete }) {
  const [sentence, setSentence] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 선택된 단어 목록을 메모이제이션하여 재랜더링 시 유지
  const selectedWords = useMemo(() => {
    const count = WORD_COUNT[difficulty] || 3;
    // 단어 풀에서 무작위로 count개 추출
    const shuffled = [...WORD_POOL].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }, [difficulty]);

  useEffect(() => {
    // 난이도가 바뀔 때 문장 초기화
    setSentence('');
  }, [difficulty]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sentence.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/analyzeSentence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: sentence.trim() })
      });
      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      onComplete(data.result);
    } catch (err) {
      console.error(err);
      setError('분석 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="compose-page">
      <h2>다음 단어를 모두 사용해 문장을 만들어 보세요!</h2>
      <div className="word-list">
        {selectedWords.map((w) => (
          <span key={w} className="word-item">{w}</span>
        ))}
      </div>

      {error && <p className="error-msg">{error}</p>}
      <form className="sentence-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="여기에 문장을 입력하세요"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          rows={4}
        />
        <button type="submit" className="submit-btn" disabled={loading}>{loading ? '분석 중...' : '완료'}</button>
      </form>
    </div>
  );
}

export default WordComposePage;
