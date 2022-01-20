<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-row icons d-flex align-items-center">
        <i class="fa fa-heart"></i> <i class="fa fa-smile-o ml-2"></i>
      </div>
      <div class="d-flex flex-row muted-color">
        <span v-if="!isToggledCommentBTN"
          ><button
            @click="isToggledCommentBTN = !isToggledCommentBTN"
            class="form-control"
          >
            {{ count == 0 ? "" : count }} Comments
          </button></span
        >
        <span v-else
          ><button
            @click="isToggledCommentBTN = !isToggledCommentBTN"
            class="form-control"
          >
            Hide Comments
          </button></span
        >
      </div>
    </div>
    <hr />
    <div class="comments" v-if="isToggledCommentBTN">
      <ul
        v-for="(comment, index) in allcomments"
        :key="index"
        class="main-comment"
      >
        <div class="d-flex flex-column ml-2">
          <li>
            <span class="name">{{ comment.username }}</span>
          </li>
        </div>
        <li>
          <small class="comment-text"
            ><date-format :timestamp="comment.date"
          /></small>
        </li>
        <li>
          {{ comment.comment }}
        </li>
        <li>
          <hr />
          <reply-list
            :replies="comment.reply"
            :commentId="comment._id"
            :postId="comment.postId"
            :userId="userId"
            :username="username"
            :replydate="comment.date"
            @reload="reloadComment"
          />
          <hr />
        </li>
      </ul>
      <div class="comment-input">
        <form @submit.prevent="addComment">
          <input type="text" class="form-control" v-model="comment" />

          <div class="fonts">
            <button
              class="fa fa-camera form-control"
              style="margin-top: -8px; margin-left: 15px"
            >
              <i>Post</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { watchEffect } from "vue";
import { CommentService } from "../services/CommentService";
import { ref } from "@vue/reactivity";
import DateFormat from "./DateFormat.vue";
import ReplyList from "./ReplyList.vue";

export default {
  props: {
    postId: String,
    userId: String,
    username: String,
  },
  setup(props, { emit }) {
    const comment = ref(null);
    const isToggledCommentBTN = ref(false);
    const isToggledReply = ref(false);
    const allcomments = ref(null);
    const hide = () => {
      emit("hide");
    };
    const addComment = async () => {
      try {
        const commentService = new CommentService();
        await commentService.add({
          comment: comment.value,
          postId: props.postId,
          userId: props.userId,
          username: props.username,
        });
        comment.value = "";
        loadComments();
      } catch (error) {
        console.log(error);
      }
    };

    const count = ref(null);
    const loadComments = async () => {
      try {
        const commentService = new CommentService();
        const response = await commentService.get(props.postId);
        allcomments.value = { ...response.data };
        count.value = Object.keys(allcomments.value).length;
      } catch (error) {
        router.push({ name: "NetworkError" });
        console.log(error);
      }
    };
    watchEffect(() => loadComments());
    const reloadComment = () => loadComments();
    return {
      comment,
      isToggledCommentBTN,
      isToggledReply,
      addComment,
      allcomments,
      reloadComment,
      hide,
      count,
    };
  },
  components: { DateFormat, ReplyList },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");
.main-comment {
  border: 1px solid #333;
}
.main-comment li {
  display: ruby-text-container;
  list-style: none;
}

.main-reply {
  border: 2px solid blue;
  text-decoration: none;
}
.comment-header {
  display: flex;
}
.comment-header li {
  width: 50%;
}
p {
  color: royalblue;
}

body {
  background-color: rgb(116, 103, 103);
  font-family: "Poppins", sans-serif;
  font-weight: 300;
}

.card {
  border: 1x solid #a09c9c;
  margin: 10px;
}

.ellipsis {
  color: #a09c9c;
}

hr {
  color: #a09c9c;
  margin-top: 4px;
  margin-bottom: 8px;
}

.muted-color {
  color: #a09c9c;
  font-size: 13px;
}

.ellipsis i {
  margin-top: 3px;
  cursor: pointer;
}

.icons i {
  font-size: 25px;
}

.icons .fa-heart {
  color: red;
}

.icons .fa-smile-o {
  color: yellow;
  font-size: 29px;
}

.rounded-image {
  border-radius: 50% !important;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
}

.name {
  font-weight: 600;
}

.comment-text {
  font-size: 12px;
}

.status small {
  margin-right: 10px;
  color: blue;
}

.form-control {
  border-radius: 26px;
}

.comment-input {
  position: relative;
}

.fonts {
  position: absolute;
  right: 13px;
  top: 8px;
  color: #a09c9c;
}

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #8bbafe;
  outline: 0;
  box-shadow: none;
}
</style>
