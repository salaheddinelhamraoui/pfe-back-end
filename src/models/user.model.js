const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    role: { type: String, default: "USER" },
    salt: String,
    from: String,
    password: { type: String, required: true },
    data: {
      displayName: { type: String, required: true },
      photoUrl: String,
      email: { type: String, required: true, unique: true },
      settings: {
        layout: String,
        theme: String,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
