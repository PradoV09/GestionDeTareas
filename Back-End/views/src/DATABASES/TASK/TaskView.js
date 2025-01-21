import express from "express";
import cors from "cors";
import connection from "../ConnectionToTheDatabase.js"; // Ajusta esta ruta según tu proyecto

const app = express();
const router = express.Router();

// Configuración de middlewares
app.use(cors()); // Permite solicitudes desde otros orígenes (frontend separado)
app.use(express.json()); // Permite manejar datos JSON en solicitudes

// Rutas

// GET: Visualizar todas las tareas
router.get("/TaskVisualizer", (req, res) => {
  const query = "SELECT id, title, description, due_date FROM Task";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener tareas:", err);
      res.status(500).send(err.message);
      return;
    }

    res.json(results); // Envía todas las tareas como un array en formato JSON
  });
});

// GET: Visualizar una tarea específica por ID
router.get("/TaskVisualizer/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT id, title, description, due_date FROM Task WHERE id = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error al obtener datos:", err);
      res.status(500).send(err.message);
      return;
    }

    if (results.length === 0) {
      res.status(404).send("Tarea no encontrada");
      return;
    }

    res.json(results[0]); // Envía solo la primera tarea encontrada como JSON
  });
});

export default router;