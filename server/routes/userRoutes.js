import express from "express";
import {
  getAllUsers,
  getCurrentUser,
  login,
  register,
} from "../controller/userController.js";
import { vertifyToken } from "../utils/token.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", vertifyToken, getCurrentUser);
router.get("/allusers/:id", getAllUsers);

export default router;
