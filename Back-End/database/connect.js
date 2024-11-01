import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url).then(() => console.log("MongoDB Connected..."));
};
export default connectDB;
