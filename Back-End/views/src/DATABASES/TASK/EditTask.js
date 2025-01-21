import express from "express";
import connection from "../ConnectionToTheDatabase.js"; // Ajusta la ruta según la estructura de tu proyecto
const router = express.Router();

// PUT: Actualizar una tarea específica por ID
router.put("/EditTask/:id", (req, res) => {
  const { id } = req.params; // Obtén el ID de los parámetros de la URL
  const { title, description, due_date } = req.body; // Obtén los valores del cuerpo de la solicitud

  console.log("Datos recibidos:", { id, title, description, due_date });

  // Validación de datos
  if (!id || !title || !description || !due_date) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  const query =
    "UPDATE task SET Title = ?, Description = ?, due_date = ? WHERE id = ?";
  connection.query(query, [title, description, due_date, id], (err, result) => {
    if (err) {
      console.error("Error al actualizar la tarea:", err);
      return res.status(500).json({ status: "error", message: err.message });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Tarea no encontrada" });
    }

    res.json({ status: "success", message: "Tarea actualizada" });
    console.log("Tarea actualizada con éxito:", {
      id,
      title,
      description,
      due_date,
    });
  });
});

export default router;
