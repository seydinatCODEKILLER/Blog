import express from "express";
import connectDB from "./database/connect.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";
import path from "path";
import { errorHandlerMiddleware } from "./middleware/errorHandler.js";
import { fileURLToPath } from "url";

const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/upload", express.static(path.join(__dirname, "upload")));

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
