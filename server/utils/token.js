import jwt from "jsonwebtoken";

export const generateToken = (value) => {
  const token = jwt.sign(value, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "10h",
  });
  return token;
};

export const vertifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer") return res.sendStatus(401);
  try {
    const vertified = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = vertified;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token.");
  }
};
