const User = require("../models/user.model");
const { ObjectId } = require("mongodb");
const { verifyPassword, verifyEmail } = require("../utils/auth");

function register(req, res) {
  const { data, password } = req.body;
  const { displayName, email } = data;

  const { verified, msg } = verifyPassword(password);
  const isValidEmail = verifyEmail(email);
  if (!verified) {
    return res.status(404).json({
      message: msg,
    });
  }
  if (!isValidEmail) {
    return res.status(404).json({
      message: "Invalide email",
    });
  }

  const user = new User({
    password: req.body.password || "",
    data: {
      displayName: displayName || "",
      email: email || "",
    },
  });
  user.save((err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json({
      message: "User saved",
      result,
    });
  });
}

module.exports = { register };
