import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./COMPONENTS/SESSION/Home";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
  </StrictMode>
);
