import React, { useState } from "react";
import "./WordCard.css";

const WordCard = ({ word }) => {
  const [showTranslation, setShowTranslation] = useState(false);

  const toggleTranslation = () => {
    setShowTranslation((prevState) => !prevState);
  };

  return (
    <div className="word-card">
      <div className="word">{word.english}</div>
      <div className="translation">{showTranslation && word.russian}</div>
      <button onClick={toggleTranslation}>
        {showTranslation ? "Hide Translation" : "Show Translation"}
      </button>
    </div>
  );
};

export default WordCard;
