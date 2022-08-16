const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema(
  {
    role: { type: String, default: 'admin' },
    salt: String,
    from: String,
    category: String,
    password: { type: String, required: true },
    data: {
      displayName: { type: String, required: true },
      photoURL: String,
      email: { type: String, required: true, unique: true },
      settings: {
        layout: String,
        theme: String,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
