import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import WordManager from "./components/WordManager";

const App = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <WordManager />
      </main>
      <Footer />
    </div>
  );
};

export default App;
