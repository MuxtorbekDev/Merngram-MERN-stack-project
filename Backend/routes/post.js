const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const login = require("../middleware/login");
const Post = mongoose.model("Post");

router.get("/allpost", (req, res) => {
  Post.find()
    .populate("postedBy", "_id", "name")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/mypost", login, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id, name")
    .then((myPosts) => {
      res.json({ myPosts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createpost", login, (req, res) => {
  const { title, body, pic } = req.body;
  if (!title || !body || !pic) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    pic,
    postedBy: req.user,
  });

  post
    .save()
    .then((result) => {
      res.json({
        post: result,
      });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
