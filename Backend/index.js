const express = require("express");
const { Client } = require("pg");

const app = express();
const PORT = 5000;

// Database configuration from environment variables
const dbClient = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

dbClient
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("DB connection error", err));

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("Node.js backend is running 🚀");
});


app.get("/db-time", async (req, res) => {
  const result = await dbClient.query("SELECT NOW()");
  res.json(result.rows);
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
