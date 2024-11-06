import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "Please fill in all fields."));
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const connexion = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "Please fill in all fields."));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(401, "User not found"));
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next(errorHandler(401, "Invalid password"));
    }
    getAccessUser(user, res);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  const { username, email, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      getAccessUser(user, res);
    } else {
      const generateRandomPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generateRandomPassword, 10);
      const newUser = new User({
        username:
          username.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilPicture: googlePhotoUrl,
      });
      await newUser.save();
      getAccessUser(newUser, res);
    }
  } catch (error) {
    next(error);
  }
};

const getAccessUser = (user, response) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  const { password: pass, ...rest } = user._doc;
  return response
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .json(rest);
};
