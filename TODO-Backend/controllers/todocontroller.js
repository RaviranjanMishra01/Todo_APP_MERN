const Todo = require("../model/Todo")

exports.getTodos = async (req,res) =>{
    const todos  = await Todo.find();
    res.json(todos)
}

//post
exports.createTodo = async (req,res) =>{
    const todo  = await Todo.create(req.body);
    res.json(todo);
}

//update
exports.updateTodo = async (req,res) =>{
    const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.json(todo);
}

//delete
exports.deleteTodo = async (req,res) =>{
    await Todo.findByIdAndDelete(req.params.id);
    res.json({message:"Deleted"})
};