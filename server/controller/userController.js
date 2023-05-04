import bcrypt from "bcrypt";
import _ from "lodash";
import User from "./../model/userModel.js";
import { generateToken } from "../utils/token.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!email.includes("@") || !email.includes("."))
      return res.json({
        status: false,
        message: "Email must be a valid email address",
      });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({
        status: false,
        message: "Email already registered",
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    user = _.pick(user, ["_id"]);
    const token = generateToken(user);
    return res.status(201).json({
      status: true,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email.includes("@") || !email.includes("."))
      return res.status(400).json({
        status: false,
        message: "Email must be a valid email address",
      });

    let user = await User.findOne({ email });
    if (!user)
      return res.json({
        status: false,
        message: "Incorrect email or password",
      });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.json({
        status: false,
        message: "Incorrect email or password",
      });

    user = _.pick(user, ["_id"]);
    const token = generateToken(user);
    return res.status(201).json({
      status: true,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "_id",
      "username",
      "email",
    ]);
    return res.json({
      status: true,
      users: users,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  const user = req.user;
  console.log(user);
};
