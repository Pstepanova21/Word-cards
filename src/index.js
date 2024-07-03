import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Импортируем главный компонент

const container = document.getElementById("root");
const root = createRoot(container); // Создаем корень

root.render(<App />); // Рендерим приложение
