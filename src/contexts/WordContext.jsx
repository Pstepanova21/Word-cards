import React, { useState, useEffect, createContext } from "react";

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
      const response = await fetch(
        "http://itgirlschool.justmakeit.ru/api/words"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch words");
      }
      const data = await response.json();
      setWords(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addWord = (newWord) => {
    setWords([...words, { ...newWord, id: Date.now().toString() }]);
  };

  const updateWord = async (id, updatedWord) => {
    try {
      const response = await fetch(
        `http://itgirlschool.justmakeit.ru/api/words/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedWord),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update word");
      }
      const updatedWords = words.map((word) =>
        word.id === id ? updatedWord : word
      );
      setWords(updatedWords);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteWord = async (id) => {
    try {
      const response = await fetch(
        `http://itgirlschool.justmakeit.ru/api/words/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete word");
      }
      const updatedWords = words.filter((word) => word.id !== id);
      setWords(updatedWords);
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