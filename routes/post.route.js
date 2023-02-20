const express=require("express");
const {PostModel}=require("../model/post.model");
const jwt = require('jsonwebtoken');
const {authenticate}=require("../middleware/authenticate")

const postrouter=express.Router();

postrouter.get("/",async(req,res)=>{
    let {token}=req.headers;

    if(token){
        jwt.verify(token, 'shhhhh',async function(err, decoded) {
            if(decoded){
                let note=await PostModel.find({$and:[{user:decoded.userid},req.query]})
                res.send(note)
            }
            else{
                res.send({"msg": err})
            }
          });
    }
    else{
        res.send({"msg": "Please Login"})
    }
})


postrouter.get("/top",async(req,res)=>{
    let {token}=req.headers;

    if(token){
        jwt.verify(token, 'shhhhh',async function(err, decoded) {
            if(decoded){
                let note=await PostModel.find({user:decoded.userid}).sort({no_of_comments:-1})
                res.send(note)
            }
            else{
                res.send({"msg": err})
            }
          });
    }
    else{
        res.send({"msg": "Please Login"})
    }
})

postrouter.post("/create",async(req,res)=>{
    let {token}=req.headers;
    if(token){
        jwt.verify(token, 'shhhhh',async function(err, decoded) {
            if(decoded){
                req.body.user=decoded.userid;
                let post=new PostModel(req.body);
                await post.save()
                res.send({"msg": "Post Created"})
            }
            else{
                res.send({"msg": err})
            }
          });
    }
    else{
        res.send({"msg": "Please Login"})
    }
    
})


postrouter.patch("/update",authenticate,async(req,res)=>{

})

postrouter.delete("/delete/:_id",authenticate,async(req,res)=>{
    
    await PostModel.findByIdAndDelete(req.params);
    res.send({"msg": "Post Deleted"})
})

module.exports={
    postrouter
}