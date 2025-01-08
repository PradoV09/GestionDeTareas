import React, { useState } from "react";

interface EditTaskProps {
  task: { id: number; title: string; description: string; due_date: string };
  onTaskUpdated: () => void;
}

export const EditTask: React.FC<EditTaskProps> = ({ task, onTaskUpdated }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.due_date);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTask = { title, description, due_date: dueDate };

    try {
      // Asegúrate de usar el ID de la tarea al hacer la petición PUT
      const response = await fetch(
        `http://localhost:5178/api/EditTask/${task.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        }
      );

      if (response.ok) {
        alert("Tarea actualizada con éxito");
        onTaskUpdated(); // Llama al callback para actualizar la lista de tareas
      } else {
        const result = await response.json();
        alert("Error al actualizar la tarea: " + result.message);
      }
    } catch (error) {
      alert("Error al actualizar la tarea");
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <div>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Descripción:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Fecha de vencimiento:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]} // Fecha mínima: hoy
        />
      </div>
      <button type="submit">Guardar cambios</button>
    </form>
  );
};
