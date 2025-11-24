require("dotenv").config();
const express=require("express");
const connectToDb=require("./database/db");
const userRoutes=require("./routes/user");
const todoRoutes=require("./routes/todo");
const cors=require("cors");
const app=express();

const port=process.env.PORT; 
const allowedOrigins=process.env.CLIENT_ORIGIN?.split(",").map(origin=>origin.trim()).filter(Boolean) || ["http://localhost:5173"];
const corsOptions={
    origin:allowedOrigins,
    credentials:true,
};
 app.use(express.json());
 app.use(cors(corsOptions));

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