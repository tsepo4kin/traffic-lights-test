<template>
  <div id="app">
    <trafficLights :color="color" :blinking="isBlinking"></trafficLights>
    <timer
      @blinking="blinkingHandler"
      @leftTime="timeHandler"
      :time="time"
    ></timer>
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
      pattern: null,
      leftTime: null,
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
    timeHandler(val) {
      this.leftTime = val;
    },
    setLocalstorage() {
      localStorage.setItem(
        "trafficLight",
        JSON.stringify({ pattern: this.pattern, time: this.leftTime })
      );
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
      this.pattern = { color: pattern.color, nextColor: pattern.next.color };
      if (this.$route.path != pattern.path) {
        this.$router.push(pattern.path);
      }
    };

    window.addEventListener("beforeunload", this.setLocalstorage);
    let storageData = JSON.parse(localStorage.getItem("trafficLight"));
    let storagePattern;
    if (storageData.pattern != null && storageData.time != null) {
      let patterns = [red, yellowG, green, yellowR];
      for (let i of patterns) {
        if (
          i.color == storageData.pattern.color &&
          i.next.color == storageData.pattern.nextColor
        ) {
          storagePattern = new Pattern(
            i.color,
            storageData.time,
            i.path,
            i.next
          );
        }
      }
      if (
        this.$route.path == "/yellow" &&
        storageData.pattern.color != "yellow"
      ) {
        this.changeColors(yellowG, cb);
      } else if (
        this.$route.path == "/green" &&
        storageData.pattern.color != "green"
      ) {
        this.changeColors(green, cb);
      } else if (
        this.$route.path == "/red" &&
        storageData.pattern.color != "red"
      ) {
        this.changeColors(red, cb);
      } else {
        this.changeColors(storagePattern, cb);
      }
    } else if (this.$route.path == "/yellow") {
      this.changeColors(yellowG, cb);
    } else if (this.$route.path == "/green") {
      this.changeColors(green, cb);
    } else if (this.$route.path == "/red") {
      this.changeColors(red, cb);
    }
  },
};
</script>

<style></style>
