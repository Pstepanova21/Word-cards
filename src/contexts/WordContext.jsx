import React, { useState, useEffect, createContext } from "react";
import * as api from "../api/api";

export const WordContext = createContext();

const WordContextProvider = (props) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchWords();
      setWords(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addWord = async (newWord) => {
    try {
      const addedWord = await api.addWord(newWord);
      setWords((prevWords) => [...prevWords, addedWord]);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateWord = async (id, updatedWord) => {
    try {
      await api.updateWord(id, updatedWord);
      setWords((prevWords) =>
        prevWords.map((word) => (word.id === id ? updatedWord : word))
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteWord = async (id) => {
    try {
      await api.deleteWord(id);
      setWords((prevWords) => prevWords.filter((word) => word.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <WordContext.Provider
      value={{ words, loading, error, addWord, updateWord, deleteWord }}
    >
      {props.children}
    </WordContext.Provider>
  );
};

export default WordContextProvider;
