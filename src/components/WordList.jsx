import React from 'react';
import '../styles/WordList.css'; 
import WordCard from './WordCard';

const WordList = ({ words }) => {
  return (
    <div className="word-list">
      {words.map((word, index) => (
        <WordCard key={index} word={word.word} translation={word.translation} />
      ))}
    </div>
  );
};

export default WordList;
