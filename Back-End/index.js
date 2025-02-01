import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import CreateUsers from "./views/src/DATABASES/SESSION/CreateUsers.js"; // Crear usuarios
import Login from "./views/src/DATABASES/SESSION/LoginUsers.js"; // Login de usuarios
import CreateTask from "./views/src/DATABASES/TASK/CreateTask.js"; // Crear tareas
import EditTask from "./views/src/DATABASES/TASK/EditTask.js"; // Editar tareas
import DeleteTask from "./views/src/DATABASES/TASK/DeleteTask.js"; // Editar tareas
import TaskView from "./views/src/DATABASES/TASK/TaskView.js"; // Ver tareas
import SharedTask from "./views/src/DATABASES/TASK/SharedTask.js"; // Compartir tareas
import userRoutes from "./views/src/DATABASES/userRoutes.js"; // Rutas de usuarios


// Configuración del entorno de desarrollo
dotenv.config();

const app = express();
const port = process.env.PORT;
const corss = process.env.CORS;

// Configurar cors
app.use(cors({ origin: `http://localhost:${corss}` }));

// Configurar express para manejar JSON en los request y response
app.use(express.json());

//creacion de usuarios
app.use("/api", CreateUsers);

//Entrada de usuarios
app.use("/api", Login);

// Crear tareas
app.use("/api", CreateTask);

// Editar tareas
app.use("/api", EditTask);

// Eliminar tareas
app.use("/api", DeleteTask);

// Compartir tareas
app.use("/api", SharedTask);

// Rutas de usuarios
app.use("/api", userRoutes);

// Ver tareas 
app.use("/api", TaskView);


// Iniciando el server
app.listen(port, () => {
  console.log(`El servidor está funcionando en: http://localhost:${port}`);
});
