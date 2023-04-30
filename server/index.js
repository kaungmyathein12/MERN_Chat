import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log(err.message));

const server = app.listen(process.env.PORT, () =>
  console.log(`Server Started on port ${process.env.PORT}`)
);
