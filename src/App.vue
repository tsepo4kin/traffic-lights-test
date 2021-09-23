<template>
  <div id="app">
    <trafficLights :colors="colors"></trafficLights>
    <timer :time="time"></timer>
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
      colors: null,
      time: null,
    };
  },
  methods: {
    changeColors(pattern, cb) {
      cb(pattern);
      setTimeout(() => {
        this.changeColors(pattern.next, cb);
      }, pattern.time * 1000);
    },
  },
  mounted() {
    class Pattern {
      constructor(colors, time, path, next) {
        (this.colors = colors),
          (this.time = time),
          (this.next = next),
          (this.path = path);
      }
    }
    let red = new Pattern(["red", "gray", "gray"], 10, "red");
    let yellowG = new Pattern(["gray", "yellow", "gray"], 3, "yellow");
    let green = new Pattern(["gray", "gray", "green"], 15, "green");
    let yellowR = new Pattern(["gray", "yellow", "gray"], 3, "yellow");

    red.next = yellowG;
    yellowG.next = green;
    green.next = yellowR;
    yellowR.next = red;

    console.log(this.$route.path);
    this.changeColors(red, (pattern) => {
      console.log(this.colors);
      this.colors = pattern.colors;
      this.time = pattern.time;
      this.$router.push(pattern.path);
    });
  },
};
</script>

<style></style>
