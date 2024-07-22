import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import AddWordForm from "../AddWordForm/AddWordForm";
import "./WordList.css";

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

    useEffect(() => {
      wordStore.fetchWords();
    }, [wordStore]);

    const handleEditClick = (index, word) => {
      setIsEditing(index);
      setEditWord(word);
      setEmptyFields({
        english: false,
        transcription: false,
        russian: false,
      });
    };

    const handleSaveClick = () => {
      wordStore.updateWord(editWord.id, editWord);
      setIsEditing(null);
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
    };

    const toggleActions = () => {
      if (isEditing !== null) {
        setIsEditing(null);
      }
      setShowActions(!showActions);
    };

    const hasEmptyField =
      emptyFields.english || emptyFields.transcription || emptyFields.russian;

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
                          className={emptyFields.english ? "empty-field" : ""}
                        />
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
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="russian"
                          value={editWord.russian}
                          onChange={handleChange}
                          className={emptyFields.russian ? "empty-field" : ""}
                        />
                      </td>
                      <td>
                        <button
                          onClick={handleSaveClick}
                          disabled={hasEmptyField}
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
                          <button onClick={() => wordStore.deleteWord(word.id)}>
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
