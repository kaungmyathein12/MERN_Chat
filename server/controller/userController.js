import bcrypt from "bcrypt";
import _ from "lodash";
import User from "./../model/userModel.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
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
    user = _.pick(user, ["_id", "username", "email"]);
    return res.json({
      status: true,
      user,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
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

    user = _.pick(user, ["_id", "username", "email"]);
    return res.json({
      status: true,
      user,
    });
  } catch (error) {
    return res.json({
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
