require('dotenv').config();
const { cloudinary } = require('../utils/cloudinary');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { verifyPassword, verifyEmail } = require('../utils/auth');
const jwt_decode = require('jwt-decode');

const register = async (req, res) => {
  try {
    if (
      !req.body.data ||
      !req.body.password ||
      !req.body.role ||
      !req.body.data.email ||
      !req.body.data.displayName ||
      !req.body.data.photoURL
    ) {
      return res.status(400).json({
        message: 'Invalide data',
      });
    }

    const image = req.body.data.photoURL;
    const uploadResponse = await cloudinary.uploader.upload(image, {
      upload_preset: 'avatars',
    });

    const photoURL = uploadResponse.url;

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
        message: 'Invalide email',
      });
    }

    User.findOne({
      'data.email': email,
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
          displayName: displayName || '',
          email,
          photoURL: photoURL || '',
        },
      });
      user.save((err, result) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json({
          message: 'Account saved',
          result,
        });
      });
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const login = (req, res) => {
  try {
    console.log(req.body);

    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: 'Invalide data',
      });
    }

    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ error: 'Email & password required' });
    }

    User.findOne({ 'data.email': email }).exec((err, user) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      if (!user) {
        return res.status(401).json({
          message: `User not found with email: ${email}`,
        });
      }
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          { userId: user._id, email, role: user.role },
          process.env.SECRET_KEY,
          {
            expiresIn: '7d',
          }
        );

        return res.send({
          access_token: token,
          user,
        });
      }
      return res.status(401).json({
        message: 'Invalide password',
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const signInWithToken = (req, res) => {
  try {
    var decoded = jwt_decode(req.body.token);

    const email = decoded.email;

    User.findOne({ 'data.email': email }).exec((err, user) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }

      if (!user) {
        return res.status(401).json({
          message: `User not found with email: ${email}`,
        });
      }
      if (user) {
        const token = jwt.sign(
          { userId: user._id, email, role: user.role },
          process.env.SECRET_KEY,
          {
            expiresIn: '7d',
          }
        );

        return res.send({
          access_token: token,
          user,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { register, login, signInWithToken };
