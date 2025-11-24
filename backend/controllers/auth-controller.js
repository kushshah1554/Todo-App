const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const checkExistingUser = await User.findOne({ email });

    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already used please use another email ",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    if (user) {
      res.status(200).json({
        success: true,
        message: " new User added successfully",
        data: user,
      });
    } else {
      res.status(400).json({
        success: false,
        message: " sorry new User can not be added !!!",
      });
    }
  } catch (error) {
    console.log("error=", error);
    res
      .status(500)
      .json({ success: false, message: "something went wrong!!!" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const currentUser = await User.findOne({ email });

    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      currentUser.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json({ success: false, message: "You entered the wrong password" });
    }

    const accessToken = jwt.sign(
      {
        userId: currentUser._id,
        username: currentUser.username,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

   
    

    res.status(200).json({
      success: true,
      message: "You are successfully login",
      accessToken,
    });
  } catch (error) {
    console.log("error=", error);
    res
      .status(500)
      .json({ success: false, message: "something went wrong!!!" });
  }
};

const rememberMeController=async(req,res)=>{
try {
  const currentUser=await User.findById(req.userInfo.userId);
 
  
   if(!currentUser)
    {
      return res.status(400).json({success:false,message:"User not found"});
    }
    const email=currentUser.email;
    
    res.status(200).json({success:true,message:"email retrive successfully",email})
} catch (error) {
  console.log("error=",error);
  res.status(500).json({success:false,message:"something went wrong!!!!!"});
  
}
};

const checkTokenIsValidOrNot=async(req,res)=>{
  try{

  const accessToken = req.headers["authorization"];
    const token=accessToken && accessToken.split(" ")[1];
if(!token)
  {
    return res.status(400).json({success:false,message:"token is not passed"});
  }
  const decodedToken=jwt.verify(token,process.env.JWT_SECRET_KEY);

  if(decodedToken){
    res.status(200).json({success:true,message:"token is valid and active"});
  }else{
    res.status(400).json({success:false,message:"token is not valid"});

  }
}
  catch(e){
    console.log("Error:",e);
    res.status(500).json({success:false,message:"Token is not valid!!!!"});
    
  }
};



module.exports = { signupController, loginController ,rememberMeController,checkTokenIsValidOrNot};
