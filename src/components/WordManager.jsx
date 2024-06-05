import React, { useState, useEffect } from "react";
import WordList from "./WordList/WordList.jsx";
import TrainingMode from "./TrainingMode/TrainingMode.jsx";

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

  useEffect(() => {
    console.log("Saving words to localStorage:", words);
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
      <WordList
        words={words}
        onUpdateWord={updateWord}
        onDeleteWord={deleteWord}
        onAddWord={addWord}
      />
      <TrainingMode words={words} />
    </div>
  );
};

export default WordManager;
