const express=require("express")
const {connection}=require("./db")
const {userrouter}=require("./routes/user.route")
const {postrouter}=require("./routes/post.route")
require("dotenv").config()
const cors=require("cors")

const app=express();
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Backend HomePage")
})

app.use("/users",userrouter)
app.use("/posts",postrouter)

app.listen(process.env.port,async()=>{
    await connection;
    console.log(`Server running at port ${process.env.port}`)
})