export const fetchWords = async () => {
  try {
    const response = await fetch("/api/words");
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
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
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to add word", error);
    throw error;
  }
};

export const updateWord = async (id, updatedWord) => {
  try {
    const response = await fetch(`/api/words/${id}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedWord),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to update word", error);
    throw error;
  }
};

export const deleteWord = async (id) => {
  try {
    const response = await fetch(`/api/words/${id}/delete`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete word with id: ${id}`);
    }
    return response;
  } catch (error) {
    console.error("Failed to delete word", error);
    throw error;
  }
};
