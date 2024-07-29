import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import WordManager from "./components/WordManager";
import Menu from "./components/Menu/Menu";
import { observer, inject } from "mobx-react";

const App = inject("wordStore")(
  observer(({ wordStore }) => {
    useEffect(() => {
      wordStore.fetchWords();
    }, [wordStore]);

    return (
      <Router>
        <div className="app">
          <Menu />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<WordManager mode="list" />} />
              <Route
                path="/training"
                element={<WordManager mode="training" />}
              />
              <Route
                path="/carousel"
                element={<WordManager mode="carousel" />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    );
  })
);

export default App;
