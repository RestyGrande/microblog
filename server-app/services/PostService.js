const PostModel = require("../models/PostModel");

class PostService {
  async getAllPost(page, limit, sort = -1) {
    return PostModel.find({})
      .sort({ created_at: sort })
      .limit(limit)
      .skip(page * limit);
  }
  async getPost(postId) {
    return PostModel.findById({ _id: postId }).exec();
  }

  async create(data) {
    const Post = new PostModel(data);
    return Post.save();
  }
}

module.exports = new PostService();
