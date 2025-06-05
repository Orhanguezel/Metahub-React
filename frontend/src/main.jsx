import React from "react";
import ReactDOM from "react-dom/client.js";
import App from "./App.jsx";
import { ThemeProviderWrapper } from "@/contexts/ThemeProviderWrapper.jsx";
import { GsapProvider } from "@/contexts/GsapContext"; // ✅ buraya taşı
import GlobalStyles from "./styles/GlobalStyles.js";
import { Provider } from "react-redux";
import { store } from "@/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GsapProvider>
        <ThemeProviderWrapper>
          <GlobalStyles />
          <App />
        </ThemeProviderWrapper>
      </GsapProvider>
    </Provider>
  </React.StrictMode>
);
