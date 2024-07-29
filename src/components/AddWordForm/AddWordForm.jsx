import React, { useState } from "react";
import styles from "./AddWordForm.module.css";

const AddWordForm = ({ onAddWord }) => {
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
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const validateInput = () => {
    const englishRegex = /^[a-zA-Z\s]+$/;
    const russianRegex = /^[а-яА-Я\s]+$/;
    const newErrors = {
      english: !englishRegex.test(newWord.english),
      transcription: newWord.transcription.trim() === "",
      russian: !russianRegex.test(newWord.russian),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleAddClick = () => {
    if (!validateInput()) return;

    onAddWord(newWord);
    setNewWord({ english: "", transcription: "", russian: "" });
    setErrors({
      english: false,
      transcription: false,
      russian: false,
    });
  };

  return (
    <div className={styles.addWordForm}>
      <h3>Add new word</h3>
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
          <span className={styles.errorMessage}>
            Field cannot be empty and must contain only Latin letters
          </span>
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
          <span className={styles.errorMessage}>
            Field cannot be empty and must contain only Cyrillic letters
          </span>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleAddClick}>Add word</button>
      </div>
    </div>
  );
};

export default AddWordForm;
