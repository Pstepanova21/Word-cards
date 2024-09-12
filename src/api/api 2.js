export const fetchWords = async () => {
  try {
    const response = await fetch("/api/words");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch words", error);
    throw error;
  }
};

export const addWord = async (newWord) => {
  try {
    const response = await fetch("/api/words/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWord),
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to add word", error);
    throw error;
  }
};

export const updateWord = async (id, updatedWord) => {
  try {
    await fetch(`/api/words/${id}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedWord),
    });
    return updatedWord;
  } catch (error) {
    console.error("Failed to update word", error);
    throw error;
  }
};

export const deleteWord = async (id) => {
  try {
    await fetch(`/api/words/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Failed to delete word", error);
    throw error;
  }
};
