import React, { useState, useEffect } from "react";
import "../App/App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import WordList from "../WordList/WordList";
import TrainingMode from "../TrainingMode/TrainingMode";
import wordsData from "../data/words.json"; // Импортируем данные

const App = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const storedWords = localStorage.getItem("words");
    if (storedWords) {
      setWords(JSON.parse(storedWords));
    } else {
      setWords(wordsData);
    }
  }, []);

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
    <div className="app">
      <Header />
      <main>
        <WordList
          words={words}
          onUpdateWord={updateWord}
          onDeleteWord={deleteWord}
          onAddWord={addWord}
        />
        <TrainingMode words={words} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
