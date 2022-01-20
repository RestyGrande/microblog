const express = require("express");
const path = require("path");
const multer = require("multer");
const UserService = require("../../services/UserService");
const PostService = require("../../services/PostService");
const CommentService = require("../../services/CommentService");

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
router.get("/dashboard", async (req, res) => {
  const posts = await PostService.getAllPost();
  res.status(200).json(posts);
});
// get specific user
router.get("/dashboard/:userId", async (req, res) => {
  const user = await UserService.findUser(req.params.userId);

  res.json(user);
});

// get specific post
router.get("/post/:postId", async (req, res) => {
  try {
    const post = await PostService.getPost(req.params.postId);
    res.json(post);
  } catch (error) {
    res.sendStatus(500);
  }
});
// get specific comment
router.get("/post/comment/reply/:commentId", async (req, res) => {
  try {
    const comment = await CommentService.getComment(req.params.commentId);
    res.json(comment);
  } catch (error) {
    res.sendStatus(500);
  }
});
// all comment
router.get("/post/comment/:postId", async (req, res) => {
  try {
    const comment = await CommentService.getAllComment(req.params.postId);
    res.json(comment);
  } catch (error) {
    res.sendStatus(500);
  }
});
//****post route */
// add comment
router.post("/comment/add", async (req, res) => {
  try {
    await CommentService.create(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

// uploading Image
router.post("/post", upload.single("file"), (req, res) => {
  const { filename } = req.file;

  res.json(filename);
});

// creating post
router.post("/post/upload", async (req, res) => {
  try {
    await PostService.create(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
});
// login
router.post("/login", async (req, res) => {
  try {
    const user = await UserService.findEmail(req.body.email);
    const passwordOk = await user.comparePassword(req.body.password);

    if (!passwordOk) {
      res.sendStatus(401);
    } else {
      res.status(200).json({ id: user._id });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

// Register
router.post("/register", async (req, res) => {
  try {
    const checkForDuplicateUser = await UserService.checkDuplicateUser(
      req.body.email
    );

    if (checkForDuplicateUser === 0) {
      await UserService.create(req.body);
      res.sendStatus(201);
    }

    res.sendStatus(409);
  } catch (error) {
    res.sendStatus(500);
  }
});

//***put */
router.put("/post/comment/reply/:commentId", async (req, res) => {
  try {
    await CommentService.updateComment(req.params.commentId, req.body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});
module.exports = router;
