import { createStore } from "vuex";
import { UserService } from "../services/UserService";
const userService = new UserService();
import { PostService } from "../services/PostService";
const postService = new PostService();
import { CommentService } from "../services/CommentService";
const commentService = new CommentService();
export default createStore({
  state: {
    comments: [],
    user: [],
    posts: [],
    message: [],
    upload: [],
  },
  getters: {},
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_POST(state, data) {
      state.posts = data;
    },
    SET_COMMENT(state, data) {
      console.log("comment:", data);
      state.comments = data;
    },
    SET_MESSAGE(state, data) {
      state.message = data;
    },
    ADD_USER(state, data) {
      state.user.push(data);
    },
    ADD_POST(state, data) {
      state.posts.push(data);
    },
    ADD_UPLOAD(state, data) {
      state.upload.push(data);
    },
    ADD_COMMENT(state, data) {
      state.comments.push(data);
    },

    REMOVE_UPLOAD(state) {
      state.upload = [];
    },
    REMOVE_MESSAGE(state) {
      state.message = {};
    },
  },

  actions: {
    //user
    login({ commit }, data) {
      return userService
        .login(data)
        .then((res) => {
          console.log(res);
          commit("SET_USER", res.data);
        })
        .catch((error) => {
          throw error;
        });
    },
    register({ commit }, data) {
      return userService
        .register(data)
        .then((data) => {
          commit("ADD_USER", data);
        })
        .catch((error) => {
          throw error;
        });
    },
    //message
    fetchMessage({ commit }, data) {
      commit("SET_MESSAGE", data);
    },
    removeMessage({ commit }) {
      commit("REMOVE_MESSAGE");
    },
    //comment
    fetchComment({ commit }) {
      return commentService
        .get()
        .then(() => {
          const data = res.data;
          console.log("comment from action:", data);
          commit("SET_COMMENT", data);
        })
        .catch((error) => {
          throw error;
        });
    },
    addComment({ commit }, data) {
      return commentService.add(data).then((res) => {
        const data = res.data;
        commit("ADD_COMMENT", data);
      });
    },
    //posts
    fetchPost({ commit }, page, limit) {
      return postService
        .get(page, limit)
        .then((res) => {
          const data = res.data;
          commit("SET_POST", data);
        })
        .catch((error) => {
          throw error;
        });
    },
    addPost({ commit }, data) {
      return postService
        .add(data)
        .then((data) => {
          commit("ADD_POST", data);
        })
        .catch((error) => {
          throw error;
        });
    },
    upload({ commit }, data) {
      return postService
        .upload(data)
        .then((res) => {
          const data = res.data;
          commit("ADD_UPLOAD", { src: data });
        })
        .catch((error) => {
          throw error;
        });
    },
    resetUpload({ commit }) {
      commit("REMOVE_UPLOAD");
    },
  },
  modules: {},
});
