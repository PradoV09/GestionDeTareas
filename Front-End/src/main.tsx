import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./COMPONENTS/SESSION/Home";
import { Task } from "./COMPONENTS/TASK/Task";
import ProtectedRoute from "./COMPONENTS/ROUTES/ProtectedRoute";

// Simula el estado de autenticación
const isAuthenticated = true; // Cambia esto según tu lógica de autenticación

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/CreateTask"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<Task />}
            />
          }
        />
      </Routes>
    </Router>
  </StrictMode>
);
