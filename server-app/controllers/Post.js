const PostService = require("../services/PostService");

const getAllPost = async (req, res) => {
  const posts = await PostService.getAllPost(
    req.query.page | 0,
    req.query.limit | 2
  );
  res.status(200).json(posts);
};
const getPost = async (req, res) => {
  try {
    const post = await PostService.getPost(req.params.postId);
    res.json(post);
  } catch (error) {
    res.sendStatus(500);
  }
};
const uploadImage = (req, res) => {
  const { filename } = req.file;

  res.json(filename);
};

const addPost = async (req, res) => {
  try {
    await PostService.create(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};
module.exports = {
  getAllPost,
  getPost,
  uploadImage,
  addPost,
};
