import express from "express";
import connection from "../ConnectionToTheDatabase.js";
const router = express.Router();

// Middleware para procesar JSON en el cuerpo de las solicitudes
router.use(express.json());

// POST: Compartir una tarea con un usuario
router.post("/shareTask/:id", (req, res) => {
  const { task_id, email } = req.body;

  console.log("Datos recibidos:", req.body); // Verifica qué datos estás recibiendo

  if (!task_id || !email) {
    console.log("Datos incompletos", { task_id, email }); // Imprime los datos que faltan
    return res.status(400).json({ status: "error", message: "Datos incompletos" });
  }

  const query = "INSERT INTO shared_tasks (task_id, email) VALUES (?, ?)";

  connection.query(query, [task_id, email], (err, result) => {
    if (err) {
      console.error("Error al compartir la tarea:", err);
      return res.status(500).json({ status: "error", message: "Error al compartir la tarea: " + err.message });
    } else {
      res.json({ status: "success", message: "Tarea compartida con éxito" });
    }
  });
});

export default router;
