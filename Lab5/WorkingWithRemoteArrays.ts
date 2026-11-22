let todos = [
  { id: 1, title: "Task 1", completed: false, description: "First task" },
  { id: 2, title: "Task 2", completed: true, description: "Second task" },
  { id: 3, title: "Task 3", completed: false, description: "Third task" },
  { id: 4, title: "Task 4", completed: true, description: "Fourth task" },
];
export default function WorkingWithRemoteArrays(app) {
  app.get("/lab5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) return res.json(todos.filter((t) => t.completed === (completed === "true")));
    res.json(todos);
  });
  app.get("/lab5/todos/create", (req, res) => { todos.push({ id: new Date().getTime(), title: "New Task", completed: false, description: "" }); res.json(todos); });
  app.get("/lab5/todos/:id/delete", (req, res) => { todos = todos.filter((t) => t.id !== parseInt(req.params.id)); res.json(todos); });
  app.get("/lab5/todos/:id/title/:title", (req, res) => { const t = todos.find((t) => t.id === parseInt(req.params.id)); if (t) t.title = req.params.title; res.json(todos); });
  app.get("/lab5/todos/:id/completed/:completed", (req, res) => { const t = todos.find((t) => t.id === parseInt(req.params.id)); if (t) t.completed = req.params.completed === "true"; res.json(todos); });
  app.get("/lab5/todos/:id/description/:description", (req, res) => { const t = todos.find((t) => t.id === parseInt(req.params.id)); if (t) t.description = req.params.description; res.json(todos); });
  app.get("/lab5/todos/:id", (req, res) => { res.json(todos.find((t) => t.id === parseInt(req.params.id))); });
  app.post("/lab5/todos", (req, res) => { const n = { ...req.body, id: new Date().getTime() }; todos.push(n); res.json(n); });
  app.delete("/lab5/todos/:id", (req, res) => {
    const idx = todos.findIndex((t) => t.id === parseInt(req.params.id));
    if (idx === -1) { res.status(404).json({ message: `Unable to delete Todo with ID ${req.params.id}` }); return; }
    todos.splice(idx, 1); res.sendStatus(200);
  });
  app.put("/lab5/todos/:id", (req, res) => {
    const idx = todos.findIndex((t) => t.id === parseInt(req.params.id));
    if (idx === -1) { res.status(404).json({ message: `Unable to update Todo with ID ${req.params.id}` }); return; }
    todos = todos.map((t) => (t.id === parseInt(req.params.id) ? { ...t, ...req.body } : t)); res.sendStatus(200);
  });
}
