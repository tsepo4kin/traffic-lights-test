<template>
  <div
    class="color"
    :style="{ 'background-color': blinkingColor || color }"
  ></div>
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
    defaultColor: {
      type: String,
    },
  },
  data: () => ({
    blinkingColor: null,
    interval: null,
  }),
  watch: {
    blinking: function (newVal) {
      if (newVal && this.color != this.defaultColor) {
        this.interval = setInterval(() => {
          if (this.blinkingColor == this.color) {
            this.blinkingColor = this.defaultColor;
          } else {
            this.blinkingColor = this.color;
          }
        }, 450);
      } else {
        this.blinkingColor = null;
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
  margin: 15px auto;
}
</style>
