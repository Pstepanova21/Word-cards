import React, { useState } from 'react';
import '../styles/App.css'; 
import Header from './Header';
import Footer from './Footer';
import WordList from './WordList';
import TrainingMode from './TrainingMode';

const App = () => {
  const [words] = useState([
    { word: 'apple', translation: 'яблоко' },
    { word: 'book', translation: 'книга' },
  ]);

  return (
    <div className="app">
      <Header />
      <main>
        <WordList words={words} />
        <TrainingMode />
      </main>
      <Footer />
    </div>
  );
};

export default App;
