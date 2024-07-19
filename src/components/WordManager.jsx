import React, { useContext } from "react";
import WordList from "../components/WordList/WordList";
import TrainingMode from "../components/TrainingMode/TrainingMode";
import WordCarousel from "../components/WordCarousel/WordCarousel";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { WordContext } from "../contexts/WordContext";

const WordManager = ({ mode }) => {
  const { words, loading, error, updateWord, deleteWord, addWord } =
    useContext(WordContext);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  switch (mode) {
    case "training":
      return <TrainingMode words={words} />;
    case "carousel":
      return <WordCarousel words={words} />;
    default:
      return (
        <WordList
          words={words}
          onUpdateWord={updateWord}
          onDeleteWord={deleteWord}
          onAddWord={addWord}
        />
      );
  }
};

export default WordManager;
