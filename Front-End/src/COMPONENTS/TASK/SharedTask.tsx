import React, { useState, useEffect } from "react"; // Importar useEffect aquí

interface User {
  id: number;
  name: string;
}

interface SharedTaskProps {
  taskId: number;
}

export const SharedTask: React.FC<SharedTaskProps> = ({ taskId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // Cargar los usuarios desde la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5178/api/users");
        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  // Manejar el envío de la solicitud para compartir la tarea
  const handleShare = async () => {
    if (!selectedUserId) {
      alert("Por favor, selecciona un usuario");
      return;
    }

    try {
      const response = await fetch("http://localhost:5178/api/shareTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task_id: taskId,
          user_id: selectedUserId,
        }),
      });

      if (response.ok) {
        alert("Tarea compartida con éxito");
      } else {
        const result = await response.json();
        alert("Error al compartir la tarea: " + result.message);
      }
    } catch (error) {
      alert("Error al compartir la tarea");
    }
  };

  return (
    <div>
      <h3>Compartir tarea</h3>
      <select
        onChange={(e) => setSelectedUserId(Number(e.target.value))}
        value={selectedUserId || ""}
      >
        <option value="">Selecciona un usuario</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <button onClick={handleShare}>Compartir</button>
    </div>
  );
};
