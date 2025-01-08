import React, { useState } from "react";
import { TaskList } from "./TaskList";

export const Task: React.FC = () => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [DueDate, setDueDate] = useState("");
  const [refresh, setRefresh] = useState(false);

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
      const response = await fetch("http://localhost:5178/api/CreateTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Tarea creada con éxito");
        setRefresh(true); // Marca la lista como desactualizada
      } else {
        const result = await response.json();
        alert("Error al crear la tarea: " + result.message);
      }
    } catch (error) {
      alert("Error al crear la tarea");
    }
  };

  const handleRefreshComplete = () => {
    setRefresh(false); // Marca la lista como actualizada
  };

  return (
    <div className="home-container">
      <h1>Gestión de Tareas</h1>
      <div className="session-container">
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
              min={new Date().toISOString().split("T")[0]} // Fecha mínima: hoy
            />
          </div>
          <button type="submit">Crear Tarea</button>
        </form>
        <TaskList refresh={refresh} onRefreshComplete={handleRefreshComplete} />
      </div>
    </div>
  );
};
