const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: "Post quyish uchun profilingizga kiring!" });
  }
  const token = authorization.replace("Muxtor ", "");

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "Post quyish uchun profilingizga kiring!" });
    }

    const { _id } = payload;

    User.findById(_id).then((userData) => {
      if (!userData) {
        return res
          .status(404)
          .json({ error: "Bunday nomli foydalanuvchi mavjud emas!" });
      }
      req.user = userData;
      next();
    });
  });
};
