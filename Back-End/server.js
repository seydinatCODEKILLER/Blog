import express from "express";
import connectDB from "./database/connect.js";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
const port = 3000;

dotenv.config();
const app = express();

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRouter);

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
