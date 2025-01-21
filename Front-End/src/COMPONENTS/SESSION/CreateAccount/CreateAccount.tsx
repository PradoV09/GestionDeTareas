import React, { useState } from "react";

export const CreateAccount = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      email,
      name: username,
      password,
    };

    console.log("Datos enviados:", data); // Añadir esta línea para depuración

    try {
      const response = await fetch("http://localhost:5178/api/CreateUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Cuenta creada con éxito");
        console.log("Cuenta creada con éxito:", result);
      } else {
        alert("Error al crear cuenta: " + result.message);
        console.error("Error al crear cuenta:", result);
      }
    } catch (error) {
      alert("Error al crear cuenta");
      console.error("Error al crear cuenta:", error);
    }
  };

  return (
    <div>
      <h1>Crear Cuenta</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo Electronico"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nombre de Usuario"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  );
};
