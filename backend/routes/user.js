const express=require("express");
const authMiddleware=require("../middleware/authMiddleware")
const {signupController,loginController,rememberMeController,checkTokenIsValidOrNot}=require("../controllers/auth-controller");


const router=express.Router();

router.post("/signup",signupController);
router.post("/login",loginController);
router.get("/remember_me",authMiddleware,rememberMeController);
router.get("/token_valid_check",checkTokenIsValidOrNot);
// router.get("/getonly",authMiddleware,(req,res)=>{res.send("passes successfully")});

module.exports=router;
