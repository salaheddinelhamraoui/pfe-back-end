const User = require('../models/user.model').default;
const { ObjectId } = require('mongodb');

function addUser(req, res) {
  const user = new User({
    from: req.body.from || '',
    password: req.body.password || '',
    data: {
      displayName: req.body.data.displayName || '',
      photoUrl: req.body.data.photoUrl || '',
      email: req.body.data.email || '',
      settings: {
        layout: ObjectId(req.body.data.settings.layout),
        theme: ObjectId(req.body.data.settings.theme),
      },
    },
  });
  user.save((err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json({
      message: 'User saved',
      result,
    });
  });
}

function findUser(req, res) {
  const { userId } = req.params;
  try {
    User.findById(ObjectId(userId), (err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      if (!result) {
        return res.status(404).json({
          message: 'User Not found by ID :' + userId,
          result,
        });
      }
      return res.status(200).json({
        message: 'User found',
        result,
      });
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Invalide user id',
      error,
    });
  }
}

function findAllUsers(_, res) {
  User.find((err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({
      message: 'Users found',
      result,
    });
  });
}

function updateUser(req, res) {
  const { userId } = req.params;
  const user = req.body;
  try {
    User.findByIdAndUpdate(
      ObjectId(userId),
      user,
      { returnDocument: 'after' },
      (err, result) => {
        if (err) {
          return res.status(400).json(err);
        }
        if (!result) {
          return res.status(404).json({
            message: 'User Not found by ID :' + userId,
            result,
          });
        }
        return res.status(200).json({
          massege: 'Upadated with success!',
          result,
        });
      }
    );
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = {
  addUser,
  findUser,
  findAllUsers,
  updateUser,
};
