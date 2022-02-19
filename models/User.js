const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      max: 30,
      unique: true,
    },
    email: {
      type: String,

      required: true,
      max: 30,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      max: 30,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
