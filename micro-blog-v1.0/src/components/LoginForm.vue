<template>
  <div>
    <div class="container" id="container">
      <div class="form-container sign-in-container">
        <form @submit.prevent="login">
          <h1>Sign in</h1>
          <notification-list :message="message" />
          <input type="email" v-model="email" placeholder="Email" />
          <input type="password" v-model="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button>Sign In</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <router-link :to="{ name: 'Register' }">
              <button class="ghost" id="signUp">Sign Up</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { computed, ref } from "@vue/reactivity";
import NotificationList from "./NotificationList.vue";
import { useStore } from "vuex";
export default {
  components: { NotificationList },
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const store = useStore();
    const user = computed(() => store.state.user);
    const message = computed(() => store.state.message);
    const login = async () => {
      try {
        await store.dispatch("login", {
          email: email.value,
          password: password.value,
        });
        store.dispatch("fetchMessage", {
          code: 200,
          text: "Successfull login",
          status: "success",
        });
        setTimeout(() => {
          store.dispatch("removeMessage");
        }, 3000);
        router.push({
          name: "Dashboard",
          params: { userId: user.value._id },
          query: { page: 1 },
          meta: { requireAuth: false },
        });
      } catch (error) {
        if (error.response.status == 401 || error.response.status == 500) {
          store.dispatch("fetchMessage", {
            code: error.response.status,
            text: "Invalid Email or Password",
            status: "danger",
          });
          setTimeout(() => {
            store.dispatch("removeMessage");
          }, 3000);
        } else {
          router.push({ name: "NetworkError" });
        }
      }
    };
    return {
      email,
      password,
      user,
      login,
      message,
    };
  },
};
</script>

<style scoped>
@import "../assets/login.css";
</style>
