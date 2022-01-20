const CommentService = require("../services/CommentService");

const getAllComment = async (req, res) => {
  try {
    const comment = await CommentService.getAllComment(req.params.postId);
    res.json(comment);
  } catch (error) {
    res.sendStatus(500);
  }
};

const addComment = async (req, res) => {
  try {
    await CommentService.create(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
const addReply = async (req, res) => {
  try {
    await CommentService.updateComment(req.params.commentId, req.body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
module.exports = {
  getAllComment,
  addComment,
  addReply,
};
