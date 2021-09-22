<template>
  <div class="timer">
    {{ seconds }}
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
  data: () => ({
    seconds: 0,
  }),
  watch: {
    time: function (newVal) {
      this.seconds = newVal;
    },
  },
  mounted() {
    setInterval(() => {
      this.seconds = this.seconds - 1;
    }, 1000);
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
