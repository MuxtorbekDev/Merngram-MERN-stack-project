const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const login = require("../middleware/login");
const mdl = require("../middleware/mdl");

router.get("/protected", login, (req, res) => {
  res.send("hello world");
});

router.post("/signup", mdl, (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: "Bu email ruyhatdan o'tgan!" });
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
          res.json({ msg: "Siz Muofiqiyatli Ruyhatdan O'tdingiz!" });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }

  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      res.status(422).json({ error: "Invalid email" });
    }

    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({ msg: "successfully signed in" });
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email } = savedUser;
          res.json({ token: token, user: { _id, name, email } });
        } else {
          return res.status(422).json({ error: "Invalid email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
