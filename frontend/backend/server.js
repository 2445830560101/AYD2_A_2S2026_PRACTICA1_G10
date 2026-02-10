const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// 🔐 LOGIN
server.get("/api/login", (req, res) => {
  const { email, password } = req.query;
  const users = router.db.get("users").value();

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  res.json(user);
});

// 📊 DASHBOARD POR ROL
server.get("/api/dashboard", (req, res) => {
  const { role } = req.query;
  const dashboards = router.db.get("dashboard").value();

  const data = dashboards.find(d => d.role === role);
  res.json(data || {});
});

server.use(router);

server.listen(3001, () => {
  console.log("🚀 Backend corriendo en http://localhost:3001");
});
