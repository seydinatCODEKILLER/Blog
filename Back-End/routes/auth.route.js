import express from "express";
import { connexion, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/connexion", connexion);

export default router;
