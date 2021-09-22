<template>
  <div class="timer">
    {{ time }}
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: {
    time: {
      require: true,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
