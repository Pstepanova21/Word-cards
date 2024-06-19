import React, { useState, useEffect } from "react";
import styles from "./WordCard.module.css";

const WordCard = ({ isCurrent, word }) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [isCurrent]);

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  if (!isCurrent) return null;

  return (
    <div className={styles.wordCard} onClick={toggleFlip}>
      <div
        className={`${styles.wordCardInner} ${flipped ? styles.flipped : ""}`}
      >
        <div className={styles.wordCardFront}>
          <h3>{word.english}</h3>
          <p>{word.transcription}</p>
        </div>
        <div className={styles.wordCardBack}>
          <p>{word.russian}</p>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
