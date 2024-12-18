const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Twój plik JSON
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware dla logowania
server.post("/login", (req, res) => {
  const { usernameOrEmail, password } = req.body;

  const db = router.db; // Dostęp do danych JSON
  const users = db.get("users").value(); // Pobierz użytkowników z db.json

  const user = users.find(
    (u) =>
      (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
      u.password === password
  );

  if (user) {
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token: "fake-jwt-token", // Symulacja tokena JWT
    });
  } else {
    res.status(401).json({ message: "Nieprawidłowe dane logowania." });
  }
});

// Inne endpointy (opcjonalne)
server.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Wszystkie pola są wymagane." });
  }

  const db = router.db; // Dostęp do danych JSON
  const users = db.get("users").value();

  const userExists = users.some((u) => u.username === username || u.email === email);
  if (userExists) {
    return res.status(409).json({ message: "Użytkownik już istnieje." });
  }

  const newUser = {
    id: Date.now().toString(),
    username,
    email,
    password,
  };

  db.get("users").push(newUser).write();
  res.status(201).json(newUser);
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server działa na porcie 3000");
});
