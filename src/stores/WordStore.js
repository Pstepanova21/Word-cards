import { makeAutoObservable } from "mobx";
import * as api from "../api/api";

class WordStore {
  words = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchWords = async () => {
    try {
      this.words = await api.fetchWords();
    } catch (error) {
      console.error("Failed to fetch words", error);
    }
  };

  addWord = async (newWord) => {
    try {
      const data = await api.addWord(newWord);
      this.words.push(data);
    } catch (error) {
      console.error("Failed to add word", error);
    }
  };

  updateWord = async (id, updatedWord) => {
    try {
      const data = await api.updateWord(id, updatedWord);
      this.words = this.words.map((word) => (word.id === id ? data : word));
    } catch (error) {
      console.error("Failed to update word", error);
    }
  };

  deleteWord = async (id) => {
    try {
      await api.deleteWord(id);
      this.words = this.words.filter((word) => word.id !== id);
    } catch (error) {
      console.error("Failed to delete word", error);
    }
  };
}

const wordStore = new WordStore();
export default wordStore;
