<template>
  <div>
    <!-- -->
    <ul class="pagination">
      <li class="page-item">
        <router-link
          class="page-link"
          v-if="page != 1"
          @click="prev"
          :to="{
            name: 'Dashboard',
            params: { userId: userId },
            query: { page: page },
          }"
        >
          <span aria-hidden="true">&laquo;</span>
          prev
        </router-link>
      </li>
      <!-- <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li> -->
      <li class="page-item">
        <router-link
          class="page-link"
          @click="next"
          :to="{
            name: 'Dashboard',
            params: { userId: userId },
            query: { page: page },
          }"
          >next <span aria-hidden="true">&raquo;</span></router-link
        >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    userId: String,
    page: Number,
  },
  setup(props, { emit }) {
    const prev = () => emit("prevBtn", props.page--);
    const next = () => emit("nextBtn", props.page++);
    return {
      next,
      prev,
    };
  },
};
</script>

<style></style>
