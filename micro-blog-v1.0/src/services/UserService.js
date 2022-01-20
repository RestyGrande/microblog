import axios from "axios";

export class UserService {
  constructor() {
    this.server = axios.create({
      baseURL: "http://localhost:5000/user",
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
  register(data) {
    return this.server.post("/register", data);
  }
  login(data) {
    return this.server.post("/login", data);
  }
  get(id) {
    return this.server.get(`/${id}`);
  }
}
