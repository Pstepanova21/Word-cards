import { makeAutoObservable } from "mobx";

class WordStore {
  words = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchWords = async () => {
    try {
      const response = await fetch(
        "http://itgirlschool.justmakeit.ru/api/words"
      );
      const data = await response.json();
      this.words = data;
    } catch (error) {
      console.error("Failed to fetch words", error);
    }
  };

  addWord = async (newWord) => {
    try {
      const response = await fetch(
        "http://itgirlschool.justmakeit.ru/api/words/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newWord),
        }
      );
      const data = await response.json();
      this.words.push(data);
    } catch (error) {
      console.error("Failed to add word", error);
    }
  };

  updateWord = async (id, updatedWord) => {
    try {
      await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedWord),
      });
      this.words = this.words.map((word) =>
        word.id === id ? updatedWord : word
      );
    } catch (error) {
      console.error("Failed to update word", error);
    }
  };

  deleteWord = async (id) => {
    try {
      await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}`, {
        method: "DELETE",
      });
      this.words = this.words.filter((word) => word.id !== id);
    } catch (error) {
      console.error("Failed to delete word", error);
    }
  };
}

const wordStore = new WordStore();
export default wordStore;
