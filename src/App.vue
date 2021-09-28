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
    } else if (this.$route.path == "/yellow") {
      this.startColor = "yellow";
    } else if (this.$route.path == "/green") {
      this.startColor = "green";
    } else if (this.$route.path == "/red" || this.$route.path == "/") {
      this.startColor = "red";
    }
  },
};
</script>

<style></style>
