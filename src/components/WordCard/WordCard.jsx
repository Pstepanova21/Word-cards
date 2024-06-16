import React, { useState } from "react";
import "./WordCard.css";

const WordCard = ({ word }) => {
  const [showTranslation, setShowTranslation] = useState(false);

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  return (
    <div className="word-card">
      <h3>{word.english}</h3>
      <p>{word.transcription}</p>
      <p
        className={`translation ${showTranslation ? "show" : ""}`}
        style={{ color: "green" }}
      >
        {word.russian}
      </p>
      <button onClick={toggleTranslation}>
        {showTranslation ? "Hide" : "Answer"}
      </button>
    </div>
  );
};

export default WordCard;
