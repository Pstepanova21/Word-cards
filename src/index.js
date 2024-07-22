import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "mobx-react";
import wordStore from "./stores/WordStore";

const container = document.getElementById("root");
const root = createRoot(container); // Создаем корень

// Оборачиваем приложение в провайдер MobX и передаем store
root.render(
  <Provider wordStore={wordStore}>
    <App />
  </Provider>
);
