const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      userId: req.body.userId,
      email: req.body.email,
      password: hashPassword,
      name: req.body.name,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.body.userId });
    !user && res.status(400).json("사용자가 존재하지 않습니다.");
    const password = await bcrypt.compare(req.body.password, user.password);
    !password && res.status(400).json("비밀번호가 일치하지 않습니다.");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/search", async (req, res) => {
  try {
    const email = await User.find({ email: req.body.email });
    email && res.status(200).json(email);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
