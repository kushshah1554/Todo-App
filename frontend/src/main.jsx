import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App.jsx";
import TokenProvider from "./components/TokenProvider.jsx";

axios.defaults.baseURL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TokenProvider>
      <App />
    </TokenProvider>
  </StrictMode>
);
