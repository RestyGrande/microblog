<template>
  <div class="container mt-5 mb-5">
    <h1>Oops!</h1>
    <h3>{{ message }}</h3>
    <router-link :to="{ name: 'Login' }">Back to the Login page</router-link>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
      default: "The page you're looking for is not here",
    },
  },
};
</script>
<style></style>
