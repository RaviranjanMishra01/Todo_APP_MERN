const Todo = require("../model/Todo")

exports.getTodos = async (req,res)=>{
    try{
        const todos = await Todo.find({ user: req.user.id }); // 🔥 FILTER
        res.json(todos);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

//post
exports.createTodo = async (req,res)=>{
    try{
        const todo = await Todo.create({
            ...req.body,
            user: req.user.id   // 🔥 LINKED HERE
        });

        res.json(todo);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

exports.updateTodo = async (req,res)=>{
    try{
        const todo = await Todo.findOneAndUpdate(
            { _id:req.params.id, user:req.user.id }, // 🔥 SECURITY
            req.body,
            { new:true }
        );

        if(!todo){
            return res.status(404).json({message:"Not found"});
        }

        res.json(todo);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

exports.deleteTodo = async (req,res)=>{
    try{
        const todo = await Todo.findOneAndDelete({
            _id:req.params.id,
            user:req.user.id
        });

        if(!todo){
            return res.status(404).json({message:"Not found"});
        }

        res.json({message:"Deleted"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};