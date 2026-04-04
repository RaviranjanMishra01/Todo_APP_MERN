const express = require("express")
const route = express.Router();
const TodoControllers = require("../controllers/todocontroller")

route.get("/",TodoControllers.getTodos);
route.post("/",TodoControllers.createTodo);
route.put("/:id",TodoControllers.updateTodo);
route.delete("/:id",TodoControllers.deleteTodo);



module.exports = route;