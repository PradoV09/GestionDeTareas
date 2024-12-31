import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import CreateUsers from "./views/src/DATABASES/SESSION/CreateUsers.js"; // Crear usuarios
import Login from "./views/src/DATABASES/SESSION/LoginUsers.js"; // Login de usuarios
import CreateTask from "./views/src/DATABASES/TASK/CreateTask.js"; // Crear tareas

dotenv.config();

const app = express();
const port = process.env.PORT;
const corss = process.env.CORS;

// Configurar cors
app.use(cors({ origin: `http://localhost:${corss}` }));


// Configurar express para manejar JSON en los request y response
app.use(express.json());

// Usar las rutas
app.use("/api", CreateUsers);
app.use("/api", Login);
app.use("/api", CreateTask);

app.listen(port, () => {
  console.log(`El servidor está funcionando en: http://localhost:${port}`);
});
