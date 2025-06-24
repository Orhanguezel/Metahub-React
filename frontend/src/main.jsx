// src/main.jsx
import "@/utils/gsapSetup";
import "./i18n/index";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme.js";
import GlobalStyles from "./styles/GlobalStyles.js";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
