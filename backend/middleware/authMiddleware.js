const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const accessToken = req.headers["authorization"];
  // console.log(accessToken)
  const token = accessToken && accessToken.split(" ")[1];

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "token is not available!!!" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userInfo = decodedToken;
    next();
  } catch (error) {
    console.log("Error=", error);
    res
      .status(500)
      .json({ success: false, message: "token is not valid or expired!!!" });
  }
};

module.exports=authMiddleware;