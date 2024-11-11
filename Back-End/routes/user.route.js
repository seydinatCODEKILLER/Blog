import express from "express";
import {
  updateUser,
  uploadProfileUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { upload } from "../config/multerConfig.js";

const router = express.Router();

router.put("/update/:id", verifyToken, updateUser);
router.post(
  "/upload_profile/:id",
  verifyToken,
  upload.single("profilPicture"),
  uploadProfileUser
);

export default router;
