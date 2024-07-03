import React, { useState } from "react";
import "./WordList.css";

const WordList = ({ words, onUpdateWord, onDeleteWord, onAddWord }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editWord, setEditWord] = useState({});
  const [newWord, setNewWord] = useState({
    english: "",
    transcription: "",
    russian: "",
  });
  const [showActions, setShowActions] = useState(false);

  const handleEditClick = (index, word) => {
    setIsEditing(index);
    setEditWord(word);
  };

  const handleSaveClick = () => {
    onUpdateWord(editWord.id, editWord);
    setIsEditing(null);
  };

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddClick = () => {
    onAddWord(newWord);
    setNewWord({ english: "", transcription: "", russian: "" });
  };

  const toggleActions = () => {
    if (isEditing !== null) {
      setIsEditing(null);
    }
    setShowActions(!showActions);
  };

  return (
    <div>
      {words.length > 0 && (
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
            {words.map((word, index) => (
              <tr key={word.id}>
                {isEditing === index ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="english"
                        value={editWord.english}
                        onChange={(e) => handleChange(e, setEditWord)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="transcription"
                        value={editWord.transcription}
                        onChange={(e) => handleChange(e, setEditWord)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="russian"
                        value={editWord.russian}
                        onChange={(e) => handleChange(e, setEditWord)}
                      />
                    </td>
                    <td>
                      <button onClick={handleSaveClick}>Save</button>
                      <button onClick={() => setIsEditing(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{word.english}</td>
                    <td>{word.transcription}</td>
                    <td>{word.russian}</td>
                    {showActions && (
                      <td className="actions">
                        <button onClick={() => handleEditClick(index, word)}>
                          Edit
                        </button>
                        <button onClick={() => onDeleteWord(word.id)}>
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

      {words.length > 0 && (
        <button onClick={toggleActions}>
          {showActions ? "Hide Edit Mode" : "Show Edit Mode"}
        </button>
      )}

      <div className="add-word-form">
        <h3>Add a new word</h3>
        <input
          type="text"
          name="english"
          placeholder="English"
          value={newWord.english}
          onChange={(e) => handleChange(e, setNewWord)}
        />
        <input
          type="text"
          name="transcription"
          placeholder="Transcription"
          value={newWord.transcription}
          onChange={(e) => handleChange(e, setNewWord)}
        />
        <input
          type="text"
          name="russian"
          placeholder="Russian"
          value={newWord.russian}
          onChange={(e) => handleChange(e, setNewWord)}
        />
        <button onClick={handleAddClick}>Add Word</button>
      </div>
    </div>
  );
};

export default WordList;
