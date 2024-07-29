import { makeAutoObservable, action } from "mobx";
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
      this.addWordToList(data);
    } catch (error) {
      console.error("Failed to add word", error);
    }
  };

  updateWord = async (id, updatedWord) => {
    try {
      const data = await api.updateWord(id, updatedWord);
      this.updateWordInList(id, data);
    } catch (error) {
      console.error("Failed to update word", error);
    }
  };

  deleteWord = action(async (id) => {
    try {
      const response = await api.deleteWord(id);
      if (response.ok) {
        this.removeWordFromList(id);
      } else {
        console.error(
          `Failed to delete word with id: ${id}, status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Failed to delete word", error);
    }
  });

  addWordToList = action((word) => {
    this.words.push(word);
  });

  updateWordInList = action((id, updatedWord) => {
    this.words = this.words.map((word) =>
      word.id === id ? updatedWord : word
    );
  });

  removeWordFromList = action((id) => {
    this.words = this.words.filter((word) => word.id !== id);
  });
}

const wordStore = new WordStore();
export default wordStore;
