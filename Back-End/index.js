import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import CreateUsers from "./views/src/DATABASES/CreateUsers.js"; // Crear usuarios
import Login from "file:///C:/Users/HP/Downloads/Nueva%20carpeta/Back-End/views/src/DATABASES/LoginUsers.js"; // Login de usuarios

dotenv.config();

const app = express();
const port = process.env.PORT;

//cors
app.use(cors({ origin: "http://localhost:5173" }));


// Configurar express para manejar JSON en los request y response
app.use(express.json());

// Usar las rutas
app.use("/api", CreateUsers);
app.use("/api", Login);

app.listen(port, () => {
  console.log(`El servidor está funcionando en: http://localhost:${port}`);
});
