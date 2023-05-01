import express from "express";
import cors from "cors";
import { Server } from "socket.io";

import dotenv from "dotenv";
import { connect } from "mongoose";

import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log(err.message));

const server = app.listen(process.env.PORT, () =>
  console.log(`Server Started on port ${process.env.PORT}`)
);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const users = {};

io.on("connection", (socket) => {
  socket.on("connected", (userId) => {
    users[userId] = socket.id;
  });

  socket.on("sendMessage", ({ to, message }) => {
    const sendUser = users[to];
    io.to(sendUser).emit("received", message);
  });
});
