const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

let users = [
    { email: "alice@example.com", password: "alice123" },
    { email: "bob@example.com", password: "bob123" },
    { email: "charlie@example.com", password: "charlie123" },
  ];

  app.put("/users", (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    const userIndex = users.findIndex((user) => user.email === email);
    if (userIndex !== -1) {
      users[userIndex].password = password;
      return res.json({ message: "Updated successfully." });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  });

  app.delete("/users", (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    const userIndex = users.findIndex((user) => user.email === email);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      return res.json({ message: "Deleted successfully" });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
