<template>
  <nav class="navbar sticky-top navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link
        class="navbar-brand"
        :to="{
          name: 'Dashboard',
          params: { userId: userId },
          query: { page: 1 },
        }"
        >Microblog v1.2</router-link
      >
      <router-link class="navbar-brand" :to="{ name: 'Login' }"
        >Logout</router-link
      >
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    userId: String,
  },
  beforeRouteLeave() {
    console.log("leave");
    return false;
    // const answer = window.confirm(
    //   "Do you really want to leave? you have unsaved changes!"
    // );
    // if (answer) {
    //   next();
    // } else {
    //   next(false);
    // }
  },
};
</script>

<style scoped>
nav {
  background: linear-gradient(to right, #ff4b2b, #ff416c);
}
</style>
