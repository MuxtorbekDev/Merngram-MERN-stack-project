const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    res.status(422).json({ error: "PLase add all the fields" });
  }

  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "User already exists with this email" });
    }
    bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({
        email,
        name,
        password: hashedPassword,
      });

      user
        .save()
        .then((user) => {
          res.json({ msg: "added successfully" });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});

module.exports = router;
