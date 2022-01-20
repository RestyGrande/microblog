<template>
  <div class="container mt-5 mb-5">
    <h1>Uh-Oh!</h1>

    <h3>
      It looks like you're experiencing some network issues, please take a
      breath and <a href="#" @click="$router.go(-1)">click here</a> to try
      again.
    </h3>
  </div>
</template>
<script>
export default {};
</script>
