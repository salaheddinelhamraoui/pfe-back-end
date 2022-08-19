const User = require('../models/user.model');
const { ObjectId } = require('mongodb');
const { cloudinary } = require('../utils/cloudinary');
const bcrypt = require('bcryptjs');

function addUser(req, res) {
  const user = new User({
    ...req.body,
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

function findAllUsers(req, res) {
  let { page, role, limit, userName } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  if (!userName) {
    userName = '';
  }

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
        result: page ? result.slice(startIndex, endIndex) : result,
      });
    });
  } else {
    User.find(
      { 'data.displayName': { $regex: userName }, role },
      (err, result) => {
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
      }
    );
  }
}

function findUserByName(req, res) {
  let userName = req.body.userName;
  const userRole = req.body.userRole;

  if (!userName) {
    userName = '';
  }

  User.find(
    { 'data.displayName': { $regex: userName }, role: userRole },
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({
        message: 'User found',
        result,
      });
    }
  );
}

async function updateUser(req, res) {
  try {
    let photoURL = '';

    if (req.body.data.photoURL) {
      const image = req.body.data.photoURL;
      const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: 'avatars',
      });

      photoURL = uploadResponse.url;
    } else {
      photoURL =
        'https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg';
    }

    const { userId } = req.params;
    const { data, category } = req.body;
    const { displayName, email } = data;

    User.findByIdAndUpdate(
      ObjectId(userId),
      {
        $set: {
          category,
          data: {
            displayName: displayName || '',
            photoURL: photoURL || '',
            email,
          },
        },
      },
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

function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    console.log(userId);

    User.deleteOne({ _id: ObjectId(userId) }, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({ message: 'User deleted' });
    });
  } catch (err) {
    console.log(err);

    return res.status(404).json({ message: err });
  }
}

module.exports = {
  addUser,
  findUser,
  findAllUsers,
  updateUser,
  deleteUser,
  findUserByName,
};
