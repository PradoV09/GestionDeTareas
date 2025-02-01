// GET: Obtener tareas compartidas con un usuario
router.get("/sharedTasks/:user_id", (req, res) => {
  const { user_id } = req.params;

  const query = `
      SELECT 
        t.id, t.title, t.description, t.due_date
      FROM 
        shared_tasks st
      INNER JOIN 
        task t ON st.task_id = t.id
      WHERE 
        st.user_id = ?`;

  connection.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Error al obtener tareas compartidas:", err);
      res.status(500).json({ status: "error", message: err.message });
    } else {
      res.json(results);
    }
  });
});

export default router;
