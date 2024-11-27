import express from "express";
import {
  deleteUser,
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
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
