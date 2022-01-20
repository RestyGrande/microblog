<template>
  <div>
    <div
      :key="message.code"
      :class="`alert alert-${message.status}`"
      role="alert"
    >
      {{ message.text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: Object,
  },
};
</script>
<style></style>
