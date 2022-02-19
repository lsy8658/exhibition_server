const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const auth = require("./routes/auth.js");
const post = require("./routes/post");
const user = require("./routes/user");
const artist = require("./routes/artist");
const path = require("path");

const multer = require("multer");
dotenv.config();
app.use(express.json());
app.use(cors());
// --------------------------file upload 관련------------------------------
app.use("/image", express.static(path.join(__dirname, "/image")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("파일이 업로드 되었습니다.");
});

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("mongodb 연결");
  }
);
app.get("/", (req, res) => {
  res.send("welcome to my memories :)");
});

app.use("/api/auth", auth);
app.use("/api/post", post);
app.use("/api/user", user);
app.use("/api/artist", artist);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("접속");
});
