const mongoose = require("mongoose");
const PostSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    userId: {
      type: String,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);
module.exports = mongoose.model("Post", PostSchema);
