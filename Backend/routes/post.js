const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const login = require("../middleware/login");
const Post = mongoose.model("Post");

router.get("/allpost", login, (req, res) => {
  Post.find()
    .populate("postedBy", "_id, name")
    .populate("comments.postedBy", "_id, name")
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
    photo: pic,
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

router.put("/like", login, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.status(200).json(result);
    }
  });
});

router.put("/unlike", login, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.status(200).json(result);
    }
  });
});

router.put("/comments", login, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id, name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.status(200).json(result);
      }
    });
});

module.exports = router;
