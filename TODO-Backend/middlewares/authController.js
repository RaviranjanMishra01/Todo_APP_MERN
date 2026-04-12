const User = require("../model/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req,res)=>{
    try{
        const {username,email,password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({message:"All fields required"});
        }

        const existing = await User.findOne({email});
        if(existing){
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({message:"User registered"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

// LOGIN
exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const token = jwt.sign(
            { id:user._id },
            process.env.JWT_SECRET,
            { expiresIn:"7d" }
        );

        res.json({
            token,
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        });

    }catch(err){
        res.status(500).json({error:err.message});
    }
};

