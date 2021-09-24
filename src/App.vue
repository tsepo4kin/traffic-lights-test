<template>
  <div id="app">
    <trafficLights :color="color" :time="isBlinking"></trafficLights>
    <timer @blinking="blinkingHandler" :time="time"></timer>
  </div>
</template>

<script>
import TrafficLights from "./views/TrafficLights.vue";
import Timer from "./components/Timer.vue";

export default {
  components: {
    Timer,
    TrafficLights,
  },
  data() {
    return {
      color: null,
      time: null,
      isBlinking: null,
    };
  },
  methods: {
    changeColors(pattern, cb) {
      cb(pattern);
      if (this.$route.path !== pattern.path) {
        this.$router.push(pattern.path);
      }
      setTimeout(() => {
        this.changeColors(pattern.next, cb);
      }, pattern.time * 1000);
    },
    blinkingHandler(val) {
      this.isBlinking = val;
    },
  },
  mounted() {
    class Pattern {
      constructor(color, time, path, next) {
        (this.color = color),
          (this.time = time),
          (this.next = next),
          (this.path = path);
      }
    }
    let red = new Pattern("red", 10, "/red");
    let yellowG = new Pattern("yellow", 3, "/yellow");
    let green = new Pattern("green", 15, "/green");
    let yellowR = new Pattern("yellow", 3, "/yellow");

    red.next = yellowG;
    yellowG.next = green;
    green.next = yellowR;
    yellowR.next = red;

    let cb = (pattern) => {
      this.color = pattern.color;
      this.time = pattern.time;
      if (this.$route.path != pattern.path) {
        this.$router.push(pattern.path);
      }
    };

    if (this.$route.path == "/yellow") {
      this.changeColors(yellowG, cb);
    } else if (this.$route.path == "/green") {
      this.changeColors(green, cb);
    } else {
      this.changeColors(red, cb);
    }
  },
};
</script>

<style></style>
