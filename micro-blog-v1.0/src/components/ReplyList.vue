<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-row icons d-flex align-items-center">
        <i class="fa fa-heart"></i> <i class="fa fa-smile-o ml-2"></i>
      </div>
      <div class="d-flex flex-row muted-color">
        <span v-if="!isToggledReplyBTN"
          ><button
            @click="isToggledReplyBTN = !isToggledReplyBTN"
            class="form-control"
          >
            Reply {{ replies.length !== 0 ? replies.length : "" }}
          </button></span
        >
        <span v-else
          ><button
            @click="isToggledReplyBTN = !isToggledReplyBTN"
            class="form-control"
          >
            Hide Reply
          </button></span
        >
      </div>
    </div>

    <div v-if="isToggledReplyBTN">
      <ul class="main-reply" v-for="commentBack in replies" :key="commentBack">
        <hr />
        <li>
          <span class="name">{{ commentBack.username }}</span>
        </li>
        <li>
          <small class="comment-text"
            ><date-format :timestamp="commentBack.date" /> </small
          >s
        </li>
        <li>{{ commentBack.reply }}</li>
      </ul>
      <li>
        <div class="comment-input">
          <form @submit.prevent="addReply()">
            <input type="text" class="form-control" v-model="reply" />

            <div class="fonts">
              <button
                class="fa fa-camera form-control"
                style="margin-top: -8px; margin-left: 15px"
              >
                <i>Reply</i>
              </button>
            </div>
          </form>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import { CommentService } from "../services/CommentService";
import { ref } from "@vue/reactivity";
import DateFormat from "./DateFormat.vue";

export default {
  components: { DateFormat },
  props: {
    replies: Array,
    commentId: String,
    userId: String,
    postId: String,
    username: String,
  },
  setup(props, { emit }) {
    const reply = ref(null);
    const isToggledReplyBTN = ref(false);
    const addReply = async () => {
      try {
        const commentService = new CommentService();
        await commentService.updateReply(props.commentId, {
          userId: props.userId,
          postId: props.postId,
          username: props.username,
          reply: reply.value,
          date: Date.now(),
        });
        reply.value = "";
        emit("reload");
      } catch (error) {
        router.push({ name: "NetworkError" });
        console.log(error);
      }
    };
    return {
      reply,
      addReply,
      isToggledReplyBTN,
    };
  },
};
</script>

<style scoped>
p {
  color: royalblue;
}
.reply {
  width: 90%;
  margin-left: 5;
}
li {
  list-style: none;
}
</style>
