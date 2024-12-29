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

// Middleware para analizar JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("jumm");
});

// Usar la ruta CreateUsers
app.use("/api", CreateUsers);
app.use("/api", Login);

app.listen(port, () => {
  console.log(`El servidor está funcionando en: http://localhost:${port}`);
});
