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
    const user = await User.findById(req.params.id);
    if (user) {
      const users = await User.find({ _id: { $ne: req.params.id } }).select([
        "_id",
        "username",
        "email",
        "image",
      ]);
      return res.json({
        status: true,
        users: users,
      });
    }
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { _id: id } = req.user;
    let user = await User.findById(id);

    res.status(200).json({
      status: true,
      user,
    });
  } catch (error) {
    return res.json({
      status: false,
      error: error.message,
    });
  }
};

export const sentFriendRequest = async (req, res) => {
  const { _id: id } = req.user;
  const { sender, receiverId } = req.body;
  let user = await User.findById(receiverId);
  if (!user)
    return res.status(404).json({ status: false, message: "User not found" });

  user = await User.findByIdAndUpdate(receiverId, {
    requestFriendList: [
      ...user.requestFriendList,
      {
        id,
        username: sender.username,
        email: sender.email,
        image: sender.image,
      },
    ],
  });
  user = _.pick(user, [
    "_id",
    "username",
    "email",
    "friendList",
    "requestFriendList",
    "image",
  ]);

  res.status(200).json({
    status: true,
    user,
  });
};

export const updateProfile = async (req, res) => {
  try {
    const { _id: id } = req.user;
    let user = await User.findById(id);
    if (!user)
      return res.status(404).json({ status: false, message: "User not found" });

    user = await User.findByIdAndUpdate(id, { image: req.body.image });
    user = _.pick(user, [
      "_id",
      "username",
      "email",
      "friendList",
      "requestFriendList",
      "image",
    ]);

    res.status(200).json({
      status: true,
      user,
    });
  } catch (error) {}
};
