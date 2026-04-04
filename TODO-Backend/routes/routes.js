const express = require("express")
const route = express.Router();
const TodoControllers = require("../controllers/todocontroller")

route.get("/",(req,res)=>{res.json({ message: "success" })})
route.get("/api/todos",TodoControllers.getTodos);
route.post("/api/todos",TodoControllers.createTodo);
route.put("/api/todos/:id",TodoControllers.updateTodo);
route.delete("/api/todos/:id",TodoControllers.deleteTodo);



module.exports = route;