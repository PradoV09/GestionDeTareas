import React, { useState } from "react";
// import "./Tasks.css";

export const Task = (): JSX.Element => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [DueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!Title || !Description || !DueDate) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const data = {
      title: Title,
      description: Description,
      due_date: DueDate,
    };
    
    try {
      const response = await fetch("http://localhost:5174/api/CreateTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Tarea creada con éxito");
        console.log("Tarea creada con éxito:", result);
      } else {
        alert("Error al crear la tarea: " + result.message);
        console.error("Error al crear la tarea:", result);
      }
    } catch (error) {
      alert("Error al crear la tarea");
      console.error("Error al crear la tarea:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>
        <input
          type="text"
          placeholder="Título de la tarea"
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Descripción:</label>
        <input
          type="text"
          placeholder="Descripción de la tarea"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Fecha de vencimiento:</label>
        <input
          type="date"
          value={DueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button type="submit">Crear Tarea</button>
    </form>
  );
};
