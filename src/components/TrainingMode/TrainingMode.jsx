import React, { useState, useEffect } from "react";
import styles from "./TrainingMode.module.css";

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
      <div className={styles.trainingMode}>
        {words.map((word) => (
          <div
            className={`${styles.wordCard} ${
              showTranslations[word.id] ? styles.flipped : ""
            }`}
            key={word.id}
            onClick={() => toggleTranslation(word.id)}
          >
            <div className={styles.wordCardInner}>
              <div className={styles.wordCardFront}>
                <h3>{word.english}</h3>
                <p>{word.transcription}</p>
              </div>
              <div className={styles.wordCardBack}>
                <p>{word.russian}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingMode;
