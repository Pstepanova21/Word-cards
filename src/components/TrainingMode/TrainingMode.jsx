import React, { useState } from "react";
import "./TrainingMode.css";

const TrainingMode = ({ words }) => {
  const [showTranslations, setShowTranslations] = useState({});

  const toggleTranslation = (wordId) => {
    setShowTranslations((prevState) => ({
      ...prevState,
      [wordId]: !prevState[wordId],
    }));
  };

  return (
    <div>
      <h2>Training Mode</h2>
      <div className="training-mode">
        {words.map((word) => (
          <div className="word-card" key={word.id}>
            <h3>{word.english}</h3>
            <p>{word.transcription}</p>
            <p style={{ color: "green" }}>
              {showTranslations[word.id] ? word.russian : ""}
            </p>
            {showTranslations[word.id] ? (
              <button onClick={() => toggleTranslation(word.id)}>
                Hide Answer
              </button>
            ) : (
              <button onClick={() => toggleTranslation(word.id)}>Answer</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingMode;
