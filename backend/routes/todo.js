const express=require("express");
const authMiddleware=require("../middleware/authMiddleware");
const {addTask,toggleController,fetchTodo,deleteTask,clearAllTask,fetchCompletedTask,getAllInCompleted}=require("../controllers/todo-controller");

const router=express.Router();

router.put("/add",authMiddleware,addTask);
router.put("/toggleList",authMiddleware,toggleController);
router.get("/getTask",authMiddleware,fetchTodo);
router.get("/getAllCompleted",authMiddleware,fetchCompletedTask);
router.get("/getAllInCompleted",authMiddleware,getAllInCompleted);
router.delete("/deleteTask/:id",authMiddleware,deleteTask);
router.delete("/deleteAllTask",authMiddleware,clearAllTask);

module.exports=router;