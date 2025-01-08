import express from "express";
import connection from "../ConnectionToTheDatabase.js"; // Verifica la ruta de tu conexión

const router = express.Router();

// Ruta para eliminar por ID
router.delete("/DeleteTask/:id", (req, res) => {
  const { id } = req.params; // Usamos el ID como parámetro en la URL

  if (!id) {
    return res.status(400).json({
      message: "El ID de la tarea es obligatorio",
    });
  }

  // Consulta SQL para eliminar la tarea por ID
  const query = "DELETE FROM task WHERE id = ?";

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar tarea:", err);
      return res.status(500).json({ message: "Error al eliminar la tarea" });
    }

    // Verificamos si se eliminó alguna tarea
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Tarea no encontrada con el ID proporcionado",
      });
    }  

    console.log("Tarea eliminada con éxito");
    return res.status(200).json({ message: "Tarea eliminada con éxito" });
  });
});

export default router;
