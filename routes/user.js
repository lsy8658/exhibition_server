const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.put("/:id", async (req, res) => {
  const user = req.params.id;

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  try {
    await User.findByIdAndUpdate(user, { $set: req.body }, { new: true });

    const userID = await User.findOne({ _id: user });
    res.status(200).json({ user: userID });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
