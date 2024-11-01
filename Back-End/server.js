import express from "express";
import connectDB from "./database/connect.js";
import dotenv from "dotenv";
const port = 3000;

dotenv.config();
const app = express();

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
