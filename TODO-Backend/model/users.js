const mongoose = require("mongoose")

const Users = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const UserModel = mongoose.model("users",Users);

module.exports = UserModel;