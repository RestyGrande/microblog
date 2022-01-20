const express = require("express");
const {
  getAllComment,
  addComment,
  addReply,
} = require("../../controllers/Comment");

const router = express.Router();

//******routes**********
//****get route */

// all comment
router.get("/post/:postId", getAllComment);
//****post route */
// add comment
router.post("/add", addComment);
//***put */
router.put("/post/reply/:commentId", addReply);
module.exports = router;
