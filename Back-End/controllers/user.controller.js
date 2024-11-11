import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import fs from "fs";
import { errorHandler } from "../utils/error.js";
import path from "path";

export const updateUser = async (req, res, next) => {
  if (req.user.userId !== req.params.id) {
    return next(
      errorHandler(400, "You do not have permission to update this user")
    );
  }
  if (req.body.password) {
    if (req.body.password < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  if (req.body.username) {
    const username = req.body.username;
    if (username.length < 5 || username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 3 and 20 characters")
      );
    }
    if (username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (username !== username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilPicture: req.body.profilPicture,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  }
};

export const uploadProfileUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const newImagePath = req.file.path;

    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(400, "User not found"));
    }

    // Supprimer l'ancienne photo de profil si elle existe
    if (user.profilPicture) {
      const oldImagePath = path.join(
        path.resolve(),
        "upload",
        "profile",
        path.basename(user.profilPicture)
      );

      if (fs.existsSync(oldImagePath)) {
        try {
          fs.unlinkSync(oldImagePath);
          console.log("Ancienne photo supprimée avec succès.");
        } catch (unlinkError) {
          console.error(
            "Erreur lors de la suppression de l'ancienne image :",
            unlinkError
          );
        }
      }
    }

    // Création de l'URL publique de la nouvelle image
    const imageUrl = `${process.env.BACKEND_URL}/upload/profile/${path
      .basename(newImagePath)
      .replace(/\\/g, "/")}`;

    // Mise à jour de l'utilisateur
    user.profilPicture = imageUrl;
    await user.save();

    res.json({
      message: "Photo de profil mise à jour avec succès",
      imageUrl: imageUrl,
    });
  } catch (error) {
    next(error);
  }
};
