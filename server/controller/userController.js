import bcrypt from "bcrypt";
import _ from "lodash";
import User from "./../model/userModel.js";

export const register = async (req, res, next) => {
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
    user = _.pick(user, ["username", "email"]);
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