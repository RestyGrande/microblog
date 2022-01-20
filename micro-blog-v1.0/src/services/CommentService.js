import axios from "axios";

export class CommentService {
  constructor() {
    this.server = axios.create({
      baseURL: "http://localhost:5000/comment",
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
  get(postId) {
    return this.server.get(`/post/${postId}`);
  }
  add(data) {
    return this.server.post("/add", data);
  }
  updateReply(commentId, data) {
    return this.server.put(`/post/reply/${commentId}`, data);
  }
}
