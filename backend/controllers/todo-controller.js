const mongoose = require("mongoose");
const User = require("../models/user");

const addTask = async (req, res) => {
  try {
    const todos = req.body.task;

    const userid = req.userInfo.userId;

    if (!todos) {
      return res
        .status(400)
        .json({ success: false, message: "please pass a task" });
    }

    const currentUser = await User.findById(userid);

    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "user not found!!!!!!" });
    }

    const updateUserInfo = await User.findByIdAndUpdate(
      userid,
      { $push: { todos: todos } },
      { new: true }
    );

    if (updateUserInfo) {
      res
        .status(200)
        .json({
          success: true,
          message: "task added successfully",
          updateUserInfo,
        });
    } else {
      res
        .status(400)
        .json({ success: false, message: "task can not be added " });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "something went wrong please try again!!!!!",
      });
  }
};

const toggleController = async (req, res) => {
  try {
    const taskId = req.body.id;
    const userid = req.userInfo.userId;

    if (!taskId) {
      return res
        .status(400)
        .json({ success: false, message: "task ID is not passes!!!!!" });
    }
    const currentUser = await User.findById(userid);
    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!!!!!" });
    }
    const todos = currentUser.todos;

    const modifiyTodos = todos.map((todo) =>
      todo.id === taskId ? { ...todo, completed: !todo.completed } : todo
    );

    currentUser.todos = modifiyTodos;
    await currentUser.save();

    res.status(200).json({success:true,message:"toggle successfully",currentUser});
  } catch (error) {
    console.log("error=", error);
    res
      .status(500)
      .json({ success: false, message: "something went wrong!!!!!" });
  }
};

const fetchTodo=async (req,res)=>{
  try {
    const currentUser=await User.findById(req.userInfo.userId);
    if(!currentUser)
    {
      return res.status(404).json({success:false,message:"User not found"});     
      
    }
    const todos=currentUser.todos;
    res.status(200).json({success:true,message:"All task fetch successfully",todos})
    
  } catch (error) {
    console.log("Error=",error);
    res.status(500).json({success:false,message:"something went wrong!!!!!!!!1"})
    
  }
};

const fetchCompletedTask=async(req,res)=>{
try {
  const currentUser=await User.findById(req.userInfo.userId);
  if(!currentUser)
  {
    return res.status(404).json({success:false,message:"user not found"});
  }
  const tasks=currentUser.todos;

  const completedTask=tasks.filter((task)=>task.completed);

  res.status(200).json({success:true,message:"All Completed task retrive successfully",completedTask});

  
} catch (error) {
  console.log("Error:",error);
  res.status(500).json({success:false,message:"something went wrong!!!!!"});

  
}
}


const getAllInCompleted=async(req,res)=>{
try {
  const currentUser=await User.findById(req.userInfo.userId);
  if(!currentUser)
  {
    return res.status(404).json({success:false,message:"User not found"});
  }

  const tasks=currentUser.todos;
  const inCompletedTasks=tasks.filter(task=>!task.completed);
  res.status(200).json({success:true,message:"All incompleted tasks retrive successfully",inCompletedTasks})
  
} catch (error) {
  console.log("Error:",error);
  res.status(500).json({success:false,message:"Something went wrong!!!!!!"});
  
}
};

const deleteTask=async(req,res)=>{

try {
  const taskId=Number(req.params.id);
  const currentUserId=req.userInfo.userId;

  if(!taskId){
    return res.status(400).json({success:false,message:"task ID is not Available"});
  }
  const currentUser=await User.findById(currentUserId);
  if(!currentUser)
  {
    return res.status(404).json({success:false,message:"user not found"});
  }
   let todos=currentUser.todos;

   todos=todos.filter((todo)=>todo.id!==taskId);
   currentUser.todos=todos;
  await currentUser.save();
  res.status(200).json({success:true,message:"Task delete successfully",currentUser});

} catch (error) {
  console.log("Error:",error);
  res.status(500).json({success:false,message:"Something went wrong!!!!!"})
  
}
};

const clearAllTask=async(req,res)=>{
try {
  const currentUser=await User.findById(req.userInfo.userId);
  if(!currentUser)
  {
    return res.status(404).json({success:false,message:"User not found"});
  }
  currentUser.todos=[];
  await currentUser.save();
  res.status(200).json({success:true,message:"All task clear successfully",currentUser});

  
} catch (error) {
  console.log("Error:",error);
  res.status(500).json({success:false,message:"something went wrong!!!!!!!"});
  
}
};

module.exports = {addTask,toggleController,fetchTodo,deleteTask,clearAllTask,fetchCompletedTask,getAllInCompleted};
