const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const corsOptions = {
  origin: [
    "https://todo-app-mern-silk.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions)); // ← FIX

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const route = require("./routes/routes");

app.get("/", (req, res) => { res.json({ message: "success" }) });
app.use("/api/todos", route);
app.use("/api/auth", authRoutes);

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch(err => console.log(err));