const Project = require('../models/project.model').default;
const { ObjectId } = require('mongodb');

function addProject(req, res) {
  const { creator_id, freelancer_id, company_id } = req.body;
  const project = new Project({
    creator_id: ObjectId(creator_id),
    freelancer_id: ObjectId(freelancer_id),
    company_id: ObjectId(company_id),
    ...req.body,
  });
  project.save((err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json({
      message: 'Project saved',
      result,
    });
  });
}

// function findUser(req, res) {
//   const { userId } = req.params;
//   try {
//     User.findById(ObjectId(userId), (err, result) => {
//       if (err) {
//         return res.status(400).json(err);
//       }
//       if (!result) {
//         return res.status(404).json({
//           message: "User Not found by ID :" + userId,
//           result,
//         });
//       }
//       return res.status(200).json({
//         message: "User found",
//         result,
//       });
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: "Invalide user id",
//       error,
//     });
//   }
// }

// function findAllUsers(_, res) {
//   User.find((err, result) => {
//     if (err) {
//       return res.status(500).json(err);
//     }
//     return res.status(200).json({
//       message: "Users found",
//       result,
//     });
//   });
// }

// function updateUser(req, res) {
//   const { userId } = req.params;
//   const user = req.body;
//   try {
//     User.findByIdAndUpdate(
//       ObjectId(userId),
//       user,
//       { returnDocument: "after" },
//       (err, result) => {
//         if (err) {
//           return res.status(400).json(err);
//         }
//         if (!result) {
//           return res.status(404).json({
//             message: "User Not found by ID :" + userId,
//             result,
//           });
//         }
//         return res.status(200).json({
//           massege: "Upadated with success!",
//           result,
//         });
//       }
//     );
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// }

module.exports = {
  addProject,
  //   findProject,
  //   findAllProjects,
  //   updateProject,
};