import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LoginProvider } from "./GlobalContexts/Providers.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
    <LoginProvider>
      <App />
    </LoginProvider>
  </StrictMode>
);
