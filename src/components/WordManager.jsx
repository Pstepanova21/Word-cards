import React, { useState, useEffect } from "react";
import WordList from "./WordList/WordList.jsx";
import TrainingMode from "./TrainingMode/TrainingMode.jsx";
import WordCarousel from "./WordCarousel/WordCarousel.jsx";

const initialWords = [
  {
    id: "16308",
    english: "girl",
    transcription: "[ɡɜːl]",
    russian: "девочка",
    tags: "general",
    tags_json: '["general"]',
  },
  {
    id: "16309",
    english: "road",
    transcription: "[rōd]",
    russian: "дорога",
    tags: "general",
    tags_json: '["general"]',
  },
  {
    id: "16317",
    english: "school",
    transcription: "[skuːl]",
    russian: "школа",
    tags: "general",
    tags_json: '["general"]',
  },
  {
    id: "16333",
    english: "hedgehog",
    transcription: "[ˈhedʒ(h)ɒɡ]",
    russian: "ёж",
    tags: "animal",
    tags_json: '["animal"]',
  },
  {
    id: "16334",
    english: "cat",
    transcription: "[cat]",
    russian: "кошка",
    tags: "animal",
    tags_json: '["animal"]',
  },
  {
    id: "16335",
    english: "dad",
    transcription: "[dæd]",
    russian: "папа",
    tags: "general",
    tags_json: '["general"]',
  },
  {
    id: "16338",
    english: "flower",
    transcription: "[ˈflaʊər]",
    russian: "цветок",
    tags: "nature",
    tags_json: '["nature"]',
  },
];

const WordManager = () => {
  const [words, setWords] = useState(() => {
    const storedWords = localStorage.getItem("words");
    return storedWords ? JSON.parse(storedWords) : initialWords;
  });

  const [mode, setMode] = useState("list");

  useEffect(() => {
    localStorage.setItem("words", JSON.stringify(words));
  }, [words]);

  const updateWord = (id, updatedWord) => {
    setWords(words.map((word) => (word.id === id ? updatedWord : word)));
  };

  const deleteWord = (id) => {
    setWords(words.filter((word) => word.id !== id));
  };

  const addWord = (newWord) => {
    setWords([...words, { ...newWord, id: Date.now().toString() }]);
  };

  return (
    <div>
      <div className="mode-toggle">
        <button onClick={() => setMode("list")}>Word List</button>
        <button onClick={() => setMode("training")}>Training Mode</button>
        <button onClick={() => setMode("carousel")}>Word Carousel</button>
      </div>
      {mode === "list" && (
        <WordList
          words={words}
          onUpdateWord={updateWord}
          onDeleteWord={deleteWord}
          onAddWord={addWord}
        />
      )}
      {mode === "training" && <TrainingMode words={words} />}
      {mode === "carousel" && <WordCarousel words={words} />}
    </div>
  );
};

export default WordManager;
