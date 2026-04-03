const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//  USE ENV VARIABLES
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const route = require("./routes/routes");

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  CORS (important for Vercel frontend)
app.use(cors({
  origin: "https://todo-app-mern-silk.vercel.app/",
  credentials: true
}));

app.use("/api/todos", route);

// DB + server start
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch(err => console.log(err));