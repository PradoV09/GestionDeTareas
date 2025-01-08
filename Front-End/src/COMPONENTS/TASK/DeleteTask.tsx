import React from "react";

interface DeleteTaskProps {
  taskId: number;
  onTaskDeleted: () => void;
}

export const DeleteTask: React.FC<DeleteTaskProps> = ({
  taskId,
  onTaskDeleted,
}) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta tarea?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5178/api/DeleteTask/${taskId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        alert("Tarea eliminada con éxito");
        onTaskDeleted();
      } else {
        const result = await response.json();
        alert("Error al eliminar la tarea: " + result.message);
      }
    } catch (error) {
      alert("Error al eliminar la tarea");
    }
  };

  return <button onClick={handleDelete}>Eliminar</button>;
};
