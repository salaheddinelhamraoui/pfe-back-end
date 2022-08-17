const User = require("../models/user.model");
const { ObjectId } = require("mongodb");

function addUser(req, res) {
  const user = new User({
    ...req.body,
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

function findUser(req, res) {
  const { userId } = req.params;
  try {
    User.findById(ObjectId(userId), (err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      if (!result) {
        return res.status(404).json({
          message: "User Not found by ID :" + userId,
          result,
        });
      }
      return res.status(200).json({
        message: "User found",
        result,
      });
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalide user id",
      error,
    });
  }
}

function findAllUsers(req, res) {
  let { page, role, limit } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  if (!role) {
    // let users = "";
    User.find((err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({
        metadata: {
          page,
          count: result.length,
          size: Math.ceil(result.length / limit),
        },
        result: result.slice(startIndex, endIndex),
      });
    });
  } else {
    User.find({ role }, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({
        metadata: {
          page,
          count: result.length,
          size: Math.ceil(result.length / limit),
        },
        result: result.slice(startIndex, endIndex),
      });
    });
  }
}

function updateUser(req, res) {
  const { userId } = req.params;
  const user = req.body;
  try {
    User.findByIdAndUpdate(
      ObjectId(userId),
      user,
      { returnDocument: "after" },
      (err, result) => {
        if (err) {
          return res.status(400).json(err);
        }
        if (!result) {
          return res.status(404).json({
            message: "User Not found by ID :" + userId,
            result,
          });
        }
        return res.status(200).json({
          massege: "Upadated with success!",
          result,
        });
      }
    );
  } catch (error) {
    return res.status(500).json(error);
  }
}

function deleteUser(req, res) {
  const { userId } = req.body;
  User.remove({ _id: ObjectId(userId) }, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({ message: "User deleted" });
  });
}

module.exports = {
  addUser,
  findUser,
  findAllUsers,
  updateUser,
  deleteUser,
};
