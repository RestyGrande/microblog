<template>
  <div>
    <div v-if="Object.keys(posts).length == 0">
      <h1>No Posts</h1>
    </div>
    <div
      v-else
      v-for="post in posts"
      :key="post._id"
      class="row d-flex align-items-center justify-content-center"
    >
      <div class="col-md-6">
        <div class="card">
          <div class="d-flex justify-content-between p-2 px-3">
            <div class="d-flex flex-row align-items-center">
              <div class="d-flex flex-column ml-2">
                <span> {{ post.username }}</span>
                <small class="text-primary">public</small>
              </div>
            </div>
            <div class="d-flex flex-row mt-1 ellipsis">
              <small class="mr-2"><date-format :timestamp="post.date" /></small>
              <i class="fa fa-ellipsis-h"></i>
            </div>
          </div>

          <a :href="img(post.image)">
            <img v-if="post.image" :src="img(post.image)" class="img-fluid"
          /></a>
          <div class="p-2">
            <p class="text-justify">
              {{ post.description }}
            </p>
            <hr />
            <comment-list
              :postId="post._id"
              :userId="userId"
              :username="username"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import DateFormat from "./DateFormat.vue";
import CommentList from "./CommentList.vue";
export default {
  components: { DateFormat, CommentList },
  props: {
    posts: Object,
    userId: String,
    username: String,
  },
  setup() {
    const imgUrl = ref("http://localhost:5000/images/");
    const img = (image) => {
      return imgUrl.value.concat(image);
    };

    return {
      imgUrl,
      img,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");

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
