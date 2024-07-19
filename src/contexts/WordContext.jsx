import React, { useState, useEffect, createContext } from "react";

export const WordContext = createContext();

const WordContextProvider = (props) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/words");
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

  const addWordToServer = async (newWord) => {
    try {
      const response = await fetch("http://localhost:3000/words", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWord),
      });
      if (!response.ok) {
        throw new Error("Failed to add word");
      }
      const addedWord = await response.json();
      setWords((prevWords) => [...prevWords, addedWord]);
      setNotification("Word added successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  const addWord = (newWord) => {
    addWordToServer(newWord);
  };

  const updateWordOnServer = async (id, updatedWord) => {
    try {
      const response = await fetch(`http://localhost:3000/words/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedWord),
      });
      if (!response.ok) {
        throw new Error("Failed to update word");
      }
      const newWordData = await response.json();
      setWords((prevWords) =>
        prevWords.map((word) => (word.id === id ? newWordData : word))
      );
      setNotification("Word updated successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  const updateWord = (id, updatedWord) => {
    updateWordOnServer(id, updatedWord);
  };

  const deleteWordFromServer = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/words/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete word");
      }
      setWords((prevWords) => prevWords.filter((word) => word.id !== id));
      setNotification("Word deleted successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteWord = (id) => {
    deleteWordFromServer(id);
  };

  return (
    <WordContext.Provider
      value={{
        words,
        loading,
        error,
        notification,
        addWord,
        updateWord,
        deleteWord,
      }}
    >
      {props.children}
    </WordContext.Provider>
  );
};

export default WordContextProvider;
