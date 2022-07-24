require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { verifyPassword, verifyEmail } = require("../utils/auth");

async function register(req, res) {
  try {
    const { data, password, role } = req.body;
    const { displayName, email } = data;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const { verified, msg } = verifyPassword(password);
    const isValidEmail = verifyEmail(email);
    if (!verified) {
      return res.status(400).json({
        message: msg,
      });
    }
    if (!isValidEmail) {
      return res.status(400).json({
        message: "Invalide email",
      });
    }

    User.findOne({
      "data.email": email,
    }).exec((err, result) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      if (result) {
        return res.status(409).json({
          message: `${email} Already exists`,
        });
      }

      const user = new User({
        role,
        salt,
        password: hashedPassword,
        data: {
          displayName: displayName || "",
          email,
        },
      });
      user.save((err, result) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json({
          message: "Account saved",
          result,
        });
      });
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const isValidEmail = verifyEmail(email);
    const { verified, msg } = verifyPassword(password);
    if (!(email && password)) {
      return res.status(400).json({ error: "Email & password required" });
    }
    if (!verified) {
      return res.status(400).json({
        message: msg,
      });
    }
    if (!isValidEmail) {
      return res.status(400).json({
        message: "Invalide email",
      });
    }
    User.findOne({ "data.email": email }).exec((err, result) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      if (!result) {
        return res.status(404).json({
          message: `User not found with email: ${email}`,
        });
      }
      if (result && bcrypt.compareSync(password, result.password)) {
        const token =
          "Bearer " +
          jwt.sign(
            { userId: result._id, email, role: result.role },
            process.env.SECRET_KEY,
            {
              expiresIn: "7d",
            }
          );
        return res.send(token);
      }
      return res.status(404).json({
        message: "Invalide password",
      });
    });
  } catch (error) {}
}

module.exports = { register, login };
