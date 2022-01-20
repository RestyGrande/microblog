const CommentModel = require("../models/CommentModel");

class CommentService {
  async getAllComment(postId) {
    return CommentModel.find({ postId: postId }).sort({ date: -1 }).limit(10);
  }
  async getComment(commentId) {
    return CommentModel.findById({ _id: commentId }).exec();
  }

  async updateComment(commentId, data) {
    return CommentModel.updateOne(
      { _id: commentId },
      {
        $push: { reply: data },
      }
    ).exec();
  }

  async create(data) {
    const comment = new CommentModel(data);
    return comment.save();
  }
}

module.exports = new CommentService();
