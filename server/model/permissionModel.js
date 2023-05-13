import mongoose from "mongoose";
const permissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const Permission = mongoose.model("Permissions", permissionSchema);
export default Permission;
