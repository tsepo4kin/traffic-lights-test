<template>
  <div class="TrafficLights">
    <light v-for="(color, i) in colors" :key="i" :color="color"></light>
  </div>
</template>

<script>
// @ is an alias to /src
import Light from "@/components/Light.vue";

export default {
  name: "TrafficLights",
  components: {
    Light,
  },
  props: {
    colors: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
.TrafficLights::before {
  content: "";
  overflow: hidden;
  display: block;
}
.TrafficLights {
  border-radius: 10px;
  margin: 20px auto;
  width: 200px;
  height: 510px;
  background-color: black;
}
</style>
