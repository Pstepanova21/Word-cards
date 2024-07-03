import React, { useState, useEffect, useRef } from "react";
import styles from "./TrainingMode.module.css";

const TrainingMode = ({ words }) => {
  const [showTranslations, setShowTranslations] = useState({});
  const [wordsStudied, setWordsStudied] = useState(0);
  const buttonRefs = useRef({});

  useEffect(() => {
    const wordIds = words.map((word) => word.id);
    if (wordIds.length > 0) {
      const firstWordId = wordIds[0];
      buttonRefs.current[firstWordId]?.focus();
    }
  }, [words]);

  const toggleTranslation = (wordId) => {
    if (!showTranslations[wordId]) {
      setWordsStudied(wordsStudied + 1);
    }
    setShowTranslations((prevState) => ({
      ...prevState,
      [wordId]: !prevState[wordId],
    }));
  };

  return (
    <div>
      <p className={styles.counter}>Words Studied: {wordsStudied}</p>
      <div className={styles.trainingMode}>
        {words.map((word) => (
          <div className={styles.wordCard} key={word.id}>
            <h3>{word.english}</h3>
            <p>{word.transcription}</p>
            <p
              className={`${styles.translation} ${
                showTranslations[word.id] ? styles.show : ""
              }`}
            >
              {word.russian}
            </p>
            <button
              ref={(el) => (buttonRefs.current[word.id] = el)}
              onClick={() => toggleTranslation(word.id)}
              className={styles.button}
            >
              {showTranslations[word.id] ? "Hide Answer" : "Answer"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingMode;
