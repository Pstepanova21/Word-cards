import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import AddWordForm from "../AddWordForm/AddWordForm";
import "./WordList.css";

// Регулярные выражения для проверки латинских и кириллических букв
const latinRegex = /^[A-Za-z\s]+$/;
const cyrillicRegex = /^[А-Яа-я\s]+$/;

const WordList = inject("wordStore")(
  observer(({ wordStore }) => {
    const [isEditing, setIsEditing] = useState(null);
    const [editWord, setEditWord] = useState({});
    const [showActions, setShowActions] = useState(false);
    const [emptyFields, setEmptyFields] = useState({
      english: false,
      transcription: false,
      russian: false,
    });
    const [invalidFields, setInvalidFields] = useState({
      english: false,
      russian: false,
    });

    useEffect(() => {
      wordStore.fetchWords();
    }, [wordStore]);

    const validateFields = () => {
      const invalid = {
        english: !latinRegex.test(editWord.english),
        russian: !cyrillicRegex.test(editWord.russian),
      };

      setInvalidFields(invalid);
      return Object.values(invalid).every((isInvalid) => !isInvalid);
    };

    const handleEditClick = (index, word) => {
      setIsEditing(index);
      setEditWord(word);
      setEmptyFields({
        english: false,
        transcription: false,
        russian: false,
      });
      setInvalidFields({
        english: false,
        russian: false,
      });
    };

    const handleSaveClick = () => {
      if (validateFields()) {
        wordStore.updateWord(editWord.id, editWord);
        setIsEditing(null);
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditWord((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      const isEmpty = value.trim() === "";
      setEmptyFields((prevEmptyFields) => ({
        ...prevEmptyFields,
        [name]: isEmpty,
      }));

      // Validate the field whenever it's changed
      if (name === "english" || name === "russian") {
        validateFields();
      }
    };

    const toggleActions = () => {
      if (isEditing !== null) {
        setIsEditing(null);
      }
      setShowActions(!showActions);
    };

    const hasEmptyField =
      emptyFields.english || emptyFields.transcription || emptyFields.russian;

    const handleDeleteClick = async (id) => {
      try {
        await wordStore.deleteWord(id);
      } catch (error) {
        console.error("Failed to delete word", error);
      }
    };

    return (
      <div>
        {wordStore.words.length > 0 && (
          <table className="word-list">
            <thead>
              <tr>
                <th>Word</th>
                <th>Transcription</th>
                <th>Translation</th>
                {showActions && <th className="actions">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {wordStore.words.map((word, index) => (
                <tr key={word.id}>
                  {isEditing === index ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="english"
                          value={editWord.english}
                          onChange={handleChange}
                          className={`${
                            emptyFields.english || invalidFields.english
                              ? "empty-field"
                              : ""
                          }`}
                          placeholder="Enter the word in English"
                        />
                        {invalidFields.english && (
                          <div className="error-message">
                            Must be Latin letters
                          </div>
                        )}
                      </td>
                      <td>
                        <input
                          type="text"
                          name="transcription"
                          value={editWord.transcription}
                          onChange={handleChange}
                          className={
                            emptyFields.transcription ? "empty-field" : ""
                          }
                          placeholder="Enter transcription"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="russian"
                          value={editWord.russian}
                          onChange={handleChange}
                          className={`${
                            emptyFields.russian || invalidFields.russian
                              ? "empty-field"
                              : ""
                          }`}
                          placeholder="Enter the translation in Russian"
                        />
                        {invalidFields.russian && (
                          <div className="error-message">
                            Must be Cyrillic letters
                          </div>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={handleSaveClick}
                          disabled={
                            hasEmptyField ||
                            Object.values(invalidFields).includes(true)
                          }
                        >
                          Save
                        </button>
                        <button onClick={() => setIsEditing(null)}>
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{word.english}</td>
                      <td>{word.transcription}</td>
                      <td>{word.russian}</td>
                      {showActions && (
                        <td>
                          <button onClick={() => handleEditClick(index, word)}>
                            Edit
                          </button>
                          <button onClick={() => handleDeleteClick(word.id)}>
                            Delete
                          </button>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button onClick={toggleActions}>
          {showActions ? "Hide Edit Mode" : "Show Edit Mode"}
        </button>
        <AddWordForm onAddWord={wordStore.addWord} />
      </div>
    );
  })
);

export default WordList;
