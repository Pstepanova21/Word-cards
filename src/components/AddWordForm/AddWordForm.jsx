import React, { useState, useContext } from "react";
import styles from "./AddWordForm.module.css";
import { WordContext } from "../../contexts/WordContext";

const AddWordForm = () => {
  const { addWord } = useContext(WordContext);

  const [newWord, setNewWord] = useState({
    english: "",
    transcription: "",
    russian: "",
  });

  const [errors, setErrors] = useState({
    english: false,
    transcription: false,
    russian: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewWord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Очищаем ошибки при изменении содержимого поля
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleAddClick = async () => {
    // Проверяем на пустые поля перед добавлением слова
    if (newWord.english.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        english: true,
      }));
    }
    if (newWord.transcription.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        transcription: true,
      }));
    }
    if (newWord.russian.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        russian: true,
      }));
    }

    // Если есть хотя бы одно пустое поле, не добавляем слово
    if (
      newWord.english.trim() === "" ||
      newWord.transcription.trim() === "" ||
      newWord.russian.trim() === ""
    ) {
      return;
    }

    // Добавляем слово
    await addWord(newWord);
    setNewWord({ english: "", transcription: "", russian: "" });
    // Очищаем ошибки после добавления слова
    setErrors({
      english: false,
      transcription: false,
      russian: false,
    });
  };

  return (
    <div className={styles.addWordForm}>
      <h3>Add a new word</h3>
      <div className={styles.inputContainer}>
        <input
          type="text"
          name="english"
          placeholder="English"
          value={newWord.english}
          onChange={handleChange}
          className={`${styles.input} ${errors.english ? styles.error : ""}`}
        />
        {errors.english && (
          <span className={styles.errorMessage}>Field cannot be empty</span>
        )}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          name="transcription"
          placeholder="Transcription"
          value={newWord.transcription}
          onChange={handleChange}
          className={`${styles.input} ${
            errors.transcription ? styles.error : ""
          }`}
        />
        {errors.transcription && (
          <span className={styles.errorMessage}>Field cannot be empty</span>
        )}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          name="russian"
          placeholder="Russian"
          value={newWord.russian}
          onChange={handleChange}
          className={`${styles.input} ${errors.russian ? styles.error : ""}`}
        />
        {errors.russian && (
          <span className={styles.errorMessage}>Field cannot be empty</span>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleAddClick}>Add Word</button>
      </div>
    </div>
  );
};

export default AddWordForm;
