<template>
  <div id="app">
    <trafficLights
      :colorStart="startColor"
      :startTime="startTime"
      @timer="timerHandler"
    ></trafficLights>
    <timer :time="leftTime"></timer>
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
      startColor: null,
      startTime: null,
      leftTime: null,
    };
  },
  methods: {
    timerHandler(value) {
      this.leftTime = value;
    },
  },
  mounted() {
    let PATH_ARRAY = ["/yellow", "/green", "/red", "/"];

    let storageData = localStorage.getItem("trafficLight")
      ? JSON.parse(localStorage.getItem("trafficLight"))
      : null;

    if (
      (storageData?.pattern != null &&
        "/" + storageData.pattern?.color == this.$route.path) ||
      (this.$route.path == "/" && storageData?.pattern != null)
    ) {
      this.startColor = storageData.pattern;
      this.startTime = storageData.time;
    } else {
      for (let path of PATH_ARRAY) {
        if (this.$route.path === path) {
          if (path == "/") {
            this.startColor = "red";
          } else {
            this.startColor = path.substring(1);
            break;
          }
        }
      }
    }
  },
};
</script>

<style></style>
