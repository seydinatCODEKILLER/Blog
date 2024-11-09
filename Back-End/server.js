import express from "express";
import connectDB from "./database/connect.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import { errorHandlerMiddleware } from "./middleware/errorHandler.js";
const port = 3000;

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

//Middleware
app.use(errorHandlerMiddleware);

//Start server
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Notre serveur tourne sur le port ${port}...`)
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
