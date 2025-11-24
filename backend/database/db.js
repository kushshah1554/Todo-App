const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("can not connect to database!!!!", error);
    process.exit(1);
  }
};

module.exports=connectToDb;