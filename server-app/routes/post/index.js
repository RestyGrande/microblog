const express = require("express");
const path = require("path");
const multer = require("multer");
const {
  getAllPost,
  getPost,
  uploadImage,
  addPost,
} = require("../../controllers/Post");

const router = express.Router();

// creating multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../../public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage: storage });
//******routes**********
//****get route */
router.get("/all", getAllPost);

// get specific post
router.get("/:postId", getPost);

//****post route */

// uploading Image
router.post("/upload", upload.single("file"), uploadImage);

// creating post
router.post("/add", addPost);
module.exports = router;
