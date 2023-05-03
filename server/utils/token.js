import jwt from "jsonwebtoken";

export const generateToken = (value) => {
  const token = jwt.sign(value, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "10h",
  });
  return token;
};

export const vertifyToken = (req, res, next) => {};
