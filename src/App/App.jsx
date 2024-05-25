import React, { useState } from 'react';
import '../App/App.css'; 
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import WordList from '../WordList/WordList';
import TrainingMode from '../TrainingMode/TrainingMode';

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
