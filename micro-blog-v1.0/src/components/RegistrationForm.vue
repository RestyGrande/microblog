<template>
  <div>
    <div class="container right-panel-active" id="container">
      <div class="form-container sign-up-container">
        <form @submit.prevent="save">
          <h1>Create Account</h1>
          <notification-list :message="message" />
          <input type="text" v-model="username" placeholder="Name" required />
          <input type="email" v-model="email" placeholder="Email" required />
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
          />
          <button>Sign Up</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <router-link :to="{ name: 'Login' }">
              <button class="ghost" id="signIn">Sign In</button></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, computed } from "@vue/reactivity";
import { useStore } from "vuex";
import NotificationList from "./NotificationList.vue";
export default {
  components: { NotificationList },
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const store = useStore();
    const message = computed(() => store.state.message);
    const save = async () => {
      try {
        await store.dispatch("register", {
          username: username.value,
          email: email.value,
          password: password.value,
        });
        store.dispatch("fetchMessage", {
          code: 200,
          text: `user was succesful added!`,
          status: "success",
        });
        setTimeout(() => {
          store.dispatch("removeMessage");
        }, 3000);

        router.push({ name: "Login" });
      } catch (error) {
        if (error.response.status == 409) {
          store.dispatch("fetchMessage", {
            code: error.response.status,
            text: `user email was already taken!`,
            status: "danger",
          });
          setTimeout(() => {
            store.dispatch("removeMessage");
          }, 3000);
        } else if (error.response.status == 500) {
          router.push({ name: "NetworkError" });
        }
      }
    };
    return {
      username,
      password,
      email,
      save,
      message,
    };
  },
};
</script>

<style scoped>
@import "../assets/login.css";
</style>
