const express=require("express");
const {UserModel}=require("../model/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userrouter=express.Router();

userrouter.post("/register",async(req,res)=>{
    let {name,email,password,gender,age,city}=req.body;

    let abc=await UserModel.find({email:email});

    if(abc.length>0){
        res.send({"msg": "User already exist, please login"})
    }
    else{
        bcrypt.hash(password, 2,async function(err, hash) {
            let user=new UserModel({name,email,password:hash,gender,age,city});
            await user.save();
            res.send({"msg": "You are registered"})
        });
    }
})



userrouter.post("/login",async(req,res)=>{
    let {email,password}=req.body;

    let abc=await UserModel.find({email:email});

    if(abc.length>0){
        bcrypt.compare(password, abc[0].password, function(err, result) {
            if(result){
                let token = jwt.sign({ userid: abc[0]._id }, 'shhhhh');
                res.send({"msg": "Login Successful","token":token})
            }
            else{
                res.send({"msg": "Wrong Credentials"})
            }
        });
    }
    else{
        res.send({"msg": "Wrong Credentials"})
    }
})


module.exports={
    userrouter
}