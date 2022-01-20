<template>
  <span>
    {{ timestamp }}
  </span>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { computed } from "@vue/reactivity";

dayjs.extend(relativeTime, localizedFormat);
export default {
  props: {
    timestamp: String,
  },
  setup(props) {
    const timestamp = computed(() => dayjs(props.timestamp).fromNow());
    return {
      timestamp,
    };
  },
};
</script>

<style></style>
