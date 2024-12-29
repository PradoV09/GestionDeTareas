import express from 'express';
import connection from "file:///C:/Users/HP/Downloads/Nueva%20carpeta/Back-End/views/src/DATABASES/ConnectionToTheDatabase.js"; // Ajusta la ruta según la estructura de tu proyecto
const router = express.Router();

// POST /Login
router.post("/Login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "El correo electrónico y la contraseña son obligatorios" });
  }

  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error al iniciar sesión:", err);
      return res.status(500).json({ message: "Error al iniciar sesión" });
    }

    if (results.length > 0) {
      console.log("Inicio de sesión exitoso:", results);
      return res.status(200).json({ message: "Inicio de sesión exitoso" });
    } else {
      return res.status(401).json({ message: "Correo electrónico o contraseña incorrectos" });
    }
  });
});

export default router; // Exportar la ruta
