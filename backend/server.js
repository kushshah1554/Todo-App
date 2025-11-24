require("dotenv").config();
const express=require("express");
const connectToDb=require("./database/db");
const userRoutes=require("./routes/user");
const todoRoutes=require("./routes/todo");
const app=express();
// const cors = require("cors");

const port=process.env.PORT; 
 app.use(express.json());
// app.use(cors());

 //connect to database
 connectToDb();


 app.use("/api/user",userRoutes);
 app.use("/api/todo",todoRoutes);
 app.get("/",(req,res)=>{
    res.send("home page");
 });

 
  

app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})