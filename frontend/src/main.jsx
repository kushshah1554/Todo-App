import { createContext, StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TokenProvider from "./components/TokenProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TokenProvider>
      <App />
    </TokenProvider>
  </StrictMode>
);
