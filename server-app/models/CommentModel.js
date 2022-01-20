const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    comment: {
      type: String,
    },
    reply: {
      type: Array,
    },
    postId: {
      type: String,
    },
    userId: {
      type: String,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Comment", CommentSchema);
