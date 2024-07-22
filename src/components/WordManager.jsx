import React from "react";
import PropTypes from "prop-types";
import WordList from "./WordList/WordList";
import WordCarousel from "./WordCarousel/WordCarousel";
import TrainingMode from "./TrainingMode/TrainingMode";
import { observer, inject } from "mobx-react";

const WordManager = inject("wordStore")(
  observer(({ mode, wordStore }) => {
    return (
      <div>
        {mode === "list" && <WordList words={wordStore.words} />}
        {mode === "carousel" && <WordCarousel words={wordStore.words} />}
        {mode === "training" && <TrainingMode words={wordStore.words} />}
      </div>
    );
  })
);

WordManager.propTypes = {
  mode: PropTypes.oneOf(["list", "carousel", "training"]).isRequired,
};

export default WordManager;
