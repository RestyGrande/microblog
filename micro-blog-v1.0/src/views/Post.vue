<template>
  <div>
    <div v-if="!toggle">
      <div class="row d-flex align-items-center justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="d-flex justify-content-between p-2 px-3">
              <div class="d-flex flex-row align-items-center">
                {{ username }}
                <div class="d-flex flex-column ml-2" style="margin-left: 10px">
                  <button @click="createPost" class="form-control">
                    Create Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <post-create
        :userId="userId"
        :username="username"
        @cancelBtn="cancelPost"
        @post="reload"
      />
    </div>
    <hr />

    <post-list :posts="posts" :userId="userId" :username="username" />

    <pagination-list
      :page="page"
      :userId="userId"
      @prevBtn="prev"
      @nextBtn="next"
    />
  </div>
</template>

<script>
import { watchEffect } from "vue";
import { computed, ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import PostList from "../components/PostList.vue";
import PostCreate from "../components/PostCreate.vue";
import PaginationList from "../components/PaginationList.vue";
import { useStore } from "vuex";

export default {
  components: { PostList, PostCreate, PaginationList },
  props: {
    userId: String,
    username: String,
    page: Number,
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const posts = computed(() => store.state.posts);
    const page = ref(1);
    const toggle = ref(false);
    page.value = Number(route.query.page);
    const createPost = () => (toggle.value = true);
    const cancelPost = (val) => {
      toggle.value = val.toggle;
    };

    const loadPost = async () => {
      try {
        await store.dispatch("fetchPost", page.value, 3);
      } catch (error) {
        router.push({ name: "NotFound", params: { message: error } });
      }
    };
    const next = () => {
      page.value++;
    };
    const prev = () => {
      page.value--;
    };
    const reload = () => {
      loadPost();
    };
    watchEffect(() => loadPost());

    return {
      toggle,
      createPost,
      cancelPost,
      reload,
      posts,
      page,
      next,
      prev,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");

body {
  background-color: rgb(252, 252, 252);
  font-family: "Poppins", sans-serif;
  font-weight: 300;
}

.card {
  border: 1x solid #a09c9c;
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
