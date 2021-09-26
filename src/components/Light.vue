<template>
  <div class="color" :style="{ 'background-color': blinkingColor }">
    {{ blinking }}
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
    },
    blinking: {
      type: Boolean,
    },
  },
  data: () => ({
    blinkingColor: null,
    interval: null,
  }),
  watch: {
    color: function (newVal) {
      this.blinkingColor = newVal;
    },
    blinking: function (newVal) {
      if (newVal) {
        this.interval = setInterval(() => {
          if (this.blinkingColor == this.color) {
            this.blinkingColor = "gray";
          } else {
            this.blinkingColor = this.color;
          }
        }, 450);
      } else {
        clearInterval(this.interval);
      }
    },
  },
};
</script>

<style>
.color {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: grey;
  margin: 15px auto;
}
</style>
