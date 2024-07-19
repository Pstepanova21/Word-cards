import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import WordManager from "./components/WordManager";
import Menu from "./components/Menu/Menu";
import WordContextProvider, { WordContext } from "./contexts/WordContext";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

const App = () => {
  return (
    <div className="app">
      <Menu />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<WordManager mode="list" />} />
          <Route path="/training" element={<WordManager mode="training" />} />
          <Route path="/carousel" element={<WordManager mode="carousel" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const AppWithLoaderAndError = () => {
  const { loading, error } = useContext(WordContext);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return <App />;
};

const Root = () => (
  <Router>
    <WordContextProvider>
      <AppWithLoaderAndError />
    </WordContextProvider>
  </Router>
);

export default Root;
