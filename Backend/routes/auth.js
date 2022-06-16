const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const login = require("../middleware/login");

router.get("/protected", login, (req, res) => {
  res.send("hello world");
});

router.post("/signup", (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name) {
    res.status(422).json({ error: "Iltimos ismingiz kiritng!" });
  }
  if (!email) {
    res.status(422).json({ error: "Iltimos emailingiz kiritng!" });
  }
  if (!password) {
    res.status(422).json({ error: "Iltimos Parol kiritng!" });
  }

  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: "Bu email ruyhatdan o'tgan!" });
    }
    bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({
        email,
        name,
        password: hashedPassword,
        pic,
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
    return res
      .status(422)
      .json({ error: "Iltimos parol va email manzilingiz kiriting!" });
  }

  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      res.status(422).json({ error: "Emailingiz Xato!" });
    }

    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({ msg: "successfully signed in" });
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email, followers, following, pic } = savedUser;
          res.json({
            token: token,
            user: { _id, name, email, followers, following, pic },
          });
        } else {
          return res.status(422).json({ error: "Parolingiz  xato!" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
