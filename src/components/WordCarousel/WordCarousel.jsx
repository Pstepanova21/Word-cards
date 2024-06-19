import React, { useState } from "react";
import PropTypes from "prop-types";
import WordCard from "../WordCard/WordCard";
import styles from "./WordCarousel.module.css";

const WordCarousel = ({ words, initialIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const goToPrevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? words.length - 1 : prevIndex - 1
    );
  };

  if (!words || words.length === 0) {
    return <p>No words available</p>;
  }

  return (
    <div className={styles.wordCarouselContainer}>
      <div className={styles.carouselHeader}>
        Word {currentIndex + 1} of {words.length}
      </div>
      <div className={styles.wordCarousel}>
        <button onClick={goToPrevCard}>&lt;</button>
        {words.map((word, index) => (
          <WordCard
            isCurrent={currentIndex === index}
            key={word.id}
            word={word}
          />
        ))}
        <button onClick={goToNextCard}>&gt;</button>
      </div>
    </div>
  );
};

WordCarousel.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      english: PropTypes.string.isRequired,
      transcription: PropTypes.string.isRequired,
      russian: PropTypes.string.isRequired,
    })
  ).isRequired,
  initialIndex: PropTypes.number,
};

WordCarousel.defaultProps = {
  initialIndex: 0,
};

export default WordCarousel;
