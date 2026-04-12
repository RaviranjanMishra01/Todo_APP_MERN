const express = require("express")
const route = express.Router();
const TodoControllers = require("../controllers/todocontroller")
const auth = require("../middlewares/authlogin")

route.get("/",auth,TodoControllers.getTodos);
route.post("/",auth,TodoControllers.createTodo);
route.put("/:id",auth,TodoControllers.updateTodo);
route.delete("/:id",auth,TodoControllers.deleteTodo);



module.exports = route;