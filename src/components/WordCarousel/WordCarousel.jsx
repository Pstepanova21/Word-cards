import React, { useState, useEffect, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import WordCard from "../WordCard/WordCard";
import styles from "./WordCarousel.module.css";
import { WordContext } from "../../contexts/WordContext";

const WordCarousel = ({ initialIndex = 0 }) => {
  const { words } = useContext(WordContext);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToNextCard = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  }, [words.length]);

  const goToPrevCard = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? words.length - 1 : prevIndex - 1
    );
  }, [words.length]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevCard();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNextCard();
      } else if (event.key === " ") {
        event.preventDefault();
        document.getElementById(`word-card-${currentIndex}`).click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, goToNextCard, goToPrevCard]);

  if (!words || words.length === 0) {
    return <p>No words available</p>;
  }

  return (
    <div className={styles.wordCarouselContainer}>
      <div className={styles.carouselHeader}>
        Word {currentIndex + 1} of {words.length}
      </div>
      <div className={styles.wordCarousel}>
        <button className={styles.carouselButton} onClick={goToPrevCard}>
          &lt;
        </button>
        {words.map((word, index) => (
          <WordCard
            isCurrent={currentIndex === index}
            key={word.id}
            word={word}
            id={`word-card-${index}`}
          />
        ))}
        <button className={styles.carouselButton} onClick={goToNextCard}>
          &gt;
        </button>
      </div>
    </div>
  );
};

WordCarousel.propTypes = {
  initialIndex: PropTypes.number,
};

export default WordCarousel;
