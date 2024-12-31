import express from 'express';
import connection from "../ConnectionToTheDatabase.js"; // Ajusta la ruta según la estructura de tu proyecto
const router = express.Router();

// POST /CreateUsers
router.post("/CreateUsers", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  connection.query(query, [name, email, password], (err, results) => {
    if (err) {
      console.error("Error al insertar usuario:", err);
      return res.status(500).json({ message: "Error al insertar usuario" });
    }
    console.log("Usuario insertado con éxito:", results);
    return res.status(201).json({ message: "Usuario creado con éxito" });
  });
});

export default router; // Exportar la ruta
