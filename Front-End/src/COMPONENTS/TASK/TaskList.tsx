import React, { useState, useEffect } from "react";
import { EditTask } from "./EdietTask";
import { DeleteTask } from "./DeleteTask";
import { SharedTask } from "./SharedTask"; // Importa el componente SharedTask

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
}

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5178/api/TaskVisualizer");
      if (!response.ok) {
        throw new Error("Error al recuperar las tareas");
      }
      const result = await response.json();
      setTasks(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskUpdated = () => {
    setEditingTask(null);
    fetchTasks();
  };

  const handleTaskDeleted = () => {
    fetchTasks();
  };

  return (
    <div className="task-list">
      <h2>Lista de Tareas</h2>

      {isLoading && <p>Cargando tareas...</p>}
      {error && <p className="error">Error: {error}</p>}

      <ul>
        {!isLoading &&
          !error &&
          tasks.map((task) => (
            <li key={task.id}>
              {editingTask && editingTask.id === task.id ? (
                <EditTask task={task} onTaskUpdated={handleTaskUpdated} />
              ) : (
                <div>
                  <strong>Titulo:</strong> {task.title} <br />
                  <strong>Descripción:</strong> {task.description} <br />
                  <strong>Fecha de vencimiento:</strong>{" "}
                  {new Date(task.due_date).toLocaleDateString()} <br />
                  <button onClick={() => setEditingTask(task)}>Editar</button>
                  <DeleteTask
                    taskId={task.id}
                    onTaskDeleted={handleTaskDeleted}
                  />
                  {/* Botón para compartir tarea */}
                  <SharedTask taskId={task.id} />
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};
