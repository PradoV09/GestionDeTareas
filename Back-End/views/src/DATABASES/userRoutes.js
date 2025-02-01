import express from "express";
import connection from "../DATABASES/ConnectionToTheDatabase.js";
const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/users", (req, res) => {
  const query = "SELECT * FROM users"; // Asegúrate de que la tabla 'users' existe en tu base de datos

  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error al obtener usuarios:", err);
      return res.status(500).json({ status: "error", message: err.message });
    }

    res.json(result); // Devuelve la lista de usuarios
  });
});

export default router;
