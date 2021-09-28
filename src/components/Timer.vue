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
<style scoped>
.timer {
  margin: 0 auto;
  font-size: 45px;
  width: 50px;
  height: 50px;
  border: 1px solid black;
  border-radius: 2px;
}
</style>
