<template>
  <div v-if="username">
    <navigation-bar :userId="userId" />
    <div class="container mt-5 mb-5">
      <h1>Welcome {{ username }}</h1>
      <Post :userId="userId" :username="username" :page="page" />
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import Post from "./Post.vue";
import NavigationBar from "../components/NavigationBar.vue";
import { useStore } from "vuex";

export default {
  components: { Post, NavigationBar },
  props: {
    userId: String,
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const username = computed(() => store.state.user.username);

    if ((username.value == undefined) | null) {
      router.push({
        name: "404Resource",
        params: { message: "Unauthorized User" },
      });
    }

    return {
      username,
    };
  },
};
</script>

<style scoped></style>
