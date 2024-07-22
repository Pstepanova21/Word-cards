export const fetchWords = async () => {
  const response = await fetch("/api/words");
  if (!response.ok) {
    throw new Error("Failed to fetch words");
  }
  return await response.json();
};

export const addWord = async (newWord) => {
  const response = await fetch("/api/words/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newWord),
  });
  if (!response.ok) {
    throw new Error("Failed to add word");
  }
  return await response.json();
};

export const updateWord = async (id, updatedWord) => {
  const response = await fetch(`/api/words/${id}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedWord),
  });
  if (!response.ok) {
    throw new Error("Failed to update word");
  }
  return await response.json();
};

export const deleteWord = async (id) => {
  const response = await fetch(`/api/words/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete word");
  }
};
