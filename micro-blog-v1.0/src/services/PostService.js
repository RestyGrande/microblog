import axios from "axios";

export class PostService {
  constructor() {
    this.server = axios.create({
      baseURL: "http://localhost:5000/post",
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
  get(page, limit) {
    console.log(page, limit);
    return this.server.get(`/all?page=${page - 1}&limit=${limit}`);
  }
  add(data) {
    return this.server.post("http://localhost:5000/post/add", data);
  }
  upload(file) {
    return this.server.post("http://localhost:5000/post/upload", file);
  }
}
