const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

router.get("/userId/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const data = post.comments;
    const user = await User.find();

    const datas = {
      post,
      user,
    };

    res.status(200).json(datas);
  } catch (err) {
    res.status(500).json(err);
  }
});

// post에 userid로 조회해서 user data 가져오기

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const arts = await Post.find({ $eq: { userId: req.body.id } });
    const user = await User.find({ $eq: { userId: req.body.id } });
    const data = {
      arts,
      user,
    };
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const art = await Post.deleteOne({ _id: req.params.id });
    res.status(200).json(art);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/heart", async (req, res) => {
  try {
    const art = await Post.find({ $eq: { _id: req.body.artId } });

    res.status(200).json(art);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const art = await Post.findOne({ _id: req.params.id });
    if (!art.likes.includes(req.body.loginId)) {
      await art.updateOne({ $push: { likes: req.body.loginId } });
      res.status(200).json(art);
    } else {
      await art.updateOne({ $pull: { likes: req.body.loginId } });
      res.status(200).json(art);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/comment/:id", async (req, res) => {
  try {
    const art = await Post.findOne({ _id: req.params.id });
    const user = await User.find({ userId: req.body.userId });

    const pic = user.map((item) => {
      return item.profilePic;
    });
    const picname = pic[0];
    const comment = art.comments;
    const keys = comment.map((item) => {
      return item.key;
    });
    const keySetting = keys.sort((a, b) => {
      return a - b;
    });
    const key = keySetting == "" ? 1 : keySetting[keySetting.length - 1] + 1;

    const data = await art.updateOne({
      $push: {
        comments: {
          userId: req.body.userId,
          desc: req.body.desc,
          pic: picname,
          key: key,
        },
      },
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/delete/:id", async (req, res) => {
  const delkey = req.body.key;
  try {
    const art = await Post.findOne({ _id: req.params.id });
    const data = await art.updateOne({
      $pull: {
        comments: {
          key: Number(delkey),
        },
      },
    });

    res.status(200).json(art);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
