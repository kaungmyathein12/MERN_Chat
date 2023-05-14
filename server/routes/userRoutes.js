import express from "express";
import {
  getAllUsers,
  getCurrentUser,
  login,
  register,
  sentFriendRequest,
  updateProfile,
} from "../controller/userController.js";
import { vertifyToken } from "../utils/token.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", vertifyToken, getCurrentUser);
router.post("/profile", vertifyToken, updateProfile);
router.get("/allusers/:id", getAllUsers);
router.post("/user/sendrequest", vertifyToken, sentFriendRequest);

export default router;
