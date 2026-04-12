const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

//  USE ENV VARIABLES
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const authRoutes = require("./routes/authRoutes");
const route = require("./routes/routes");

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  CORS (important for Vercel frontend)
app.use(cors({
  origin: "https://todo-app-mern-silk.vercel.app/login",
  credentials: true
}));

app.get("/",(req,res)=>{res.json({ message: "success" })})
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