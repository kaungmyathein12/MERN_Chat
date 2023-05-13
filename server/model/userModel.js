import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 4,
    max: 50,
  },
  image: {
    type: String,
  },
  // fri request -> requestfriendlist
  // accepted -> requestfriendlist <-> friendlist
  friendList: {
    type: Array,
  },
  requestFriendList: {
    type: Array,
  },
});

const User = mongoose.model("Users", userSchema);
export default User;
