import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import WordContextProvider from "./contexts/WordContext";

// Получаем контейнер для рендеринга
const rootElement = document.getElementById("root");

// Создаем корневой рендерер
const root = ReactDOM.createRoot(rootElement);

// Рендерим приложение
root.render(
  <React.StrictMode>
    <WordContextProvider>
      <App />
    </WordContextProvider>
  </React.StrictMode>
);
