import express from 'express';
import connection from "../ConnectionToTheDatabase.js"; // Ajusta la ruta según la estructura de tu proyecto
const router = express.Router();

// POST /CreateTask
router.post("/CreateTask", (req, res) => {
  const { title, description, due_date } = req.body;

  if (!title || !description || !due_date) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  const query = `INSERT INTO task (title, description, due_date) VALUES (?, ?, ?)`;
  connection.query(query, [title, description, due_date], (err) => {
    if (err) {
      console.error("Error al crear la tarea:", err);
      return res.status(500).json({ message: "Error al crear la tarea" });
    }
    console.log("Tarea creada con éxito: \n", title, "\n", description, "\n", due_date);
    return res.status(201).json({ message: "Tarea creada con éxito" });
  });
});

export default router; // Exportar la ruta
