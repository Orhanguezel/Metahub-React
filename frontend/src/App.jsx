import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import AppLoaderWrapper from "@/system/AppLoaderWrapper";
import { buildRoutes } from "@/routes";

const App = () => {
  return (
    <Router>
      <AppLoaderWrapper>
        <Routes>
          {buildRoutes()}
        </Routes>
      </AppLoaderWrapper>
    </Router>
  );
};

export default App;
