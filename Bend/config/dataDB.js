require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("mongo connect");
  } catch (error) {
    console.log(`Error:${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB };
