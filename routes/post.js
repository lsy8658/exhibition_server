const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
router.post("/", async (req, res) => {
  const newPost = new Post({
    userId: req.body.userId,
    title: req.body.title,
    desc: req.body.desc,
    photo: req.body.photo,
  });
  try {
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const getGallery = await Post.find();
  getGallery.sort((a, b) => {
    return b - a;
  });

  try {
    res.status(200).json(getGallery.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const getGallery = await Post.find({ userId: req.params.id });

  try {
    res.status(200).json(getGallery);
  } catch (err) {
    res.status(500).json(err);
  }
});
// -------------------------------------------------------------------
router.get("/modify/:id", async (req, res) => {
  try {
    const getGallery = await Post.find({ _id: req.params.id });

    res.status(200).json(getGallery);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const res = await Post.findByIdAndUpdate(postId, { $set: req.body });
    res.status(200).json(res);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
