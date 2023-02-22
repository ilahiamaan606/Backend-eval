const express=require("express");
const {ProductModel}=require("../model/product.model");
const jwt = require('jsonwebtoken');
const {authenticate}=require("../middleware/authenticate")

const productrouter=express.Router();

productrouter.get("/",async(req,res)=>{
    let {token}=req.headers;

    if(token){
        jwt.verify(token, 'shhhhh',async function(err, decoded) {
            if(decoded){
                let note=await ProductModel.find({$and:[{user:decoded.userid},req.query]})
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


productrouter.get("/top",async(req,res)=>{
    let {token}=req.headers;

    if(token){
        jwt.verify(token, 'shhhhh',async function(err, decoded) {
            if(decoded){
                let note=await ProductModel.find({user:decoded.userid}).sort({no_of_comments:-1})
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

productrouter.post("/create",async(req,res)=>{
    let {token}=req.headers;
    if(token){
        jwt.verify(token, 'shhhhh',async function(err, decoded) {
            if(decoded){
                // req.body.user=decoded.userid;
                ProductModel.insertMany(req.body);
                res.send({"msg": "Product Created"})
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


productrouter.patch("/update",authenticate,async(req,res)=>{

})

productrouter.delete("/delete/:_id",authenticate,async(req,res)=>{
    
    await ProductModel.findByIdAndDelete(req.params);
    res.send({"msg": "Post Deleted"})
})

module.exports={
    productrouter
}