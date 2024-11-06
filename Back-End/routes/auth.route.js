import express from "express";
import {
  connexion,
  googleAuth,
  register,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/connexion", connexion);
router.post("/google", googleAuth);

export default router;
