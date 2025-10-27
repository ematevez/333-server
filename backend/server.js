require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// ✅ Rutas principales
app.use("/api/students", require("./routes/students"));
app.use("/api/courses", require("./routes/courses"));

// Middleware global de errores
app.use((err, req, res, next) => {
  console.error("⚠️ Error global:", err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);
