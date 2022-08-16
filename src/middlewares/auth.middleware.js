const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

async function isAuth(req, res, next) {
  try {
    const token = req.headers.authorization;
    var decoded = jwt_decode(req.body.token);
    const userId = decoded.userId;
    console.log(token);

    jwt.verify(
      token.replace("Bearer ", ""),
      process.env.SECRET_KEY,
      function (err, result) {
        if (err) {
          return res.status(401).json(err);
        }
        if (!userId) {
          return res.status(400).json({
            message: "No user ID provided",
          });
        }
        if (userId && userId !== result.userId) {
          return res
            .status(451)
            .json({ message: "Sorry you can not access this route" });
        }
        next();
      }
    );
  } catch (err) {
    console.log(err);
  }
}

async function isAdmin(req, res, next) {
  const token = req.headers.authorization;
  jwt.verify(
    token.replace("Bearer ", ""),
    process.env.SECRET_KEY,
    function (err, result) {
      if (err) {
        return res.status(401).json(err);
      }
      if (result.role !== "ADMIN") {
        return res
          .status(403)
          .json({ message: "Sorry you dont have the permissions" });
      }
      next();
    }
  );
}

module.exports = { isAuth, isAdmin };
