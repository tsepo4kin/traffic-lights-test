<template>
  <div id="app">
    <timer :time="10"></timer>
    <router-view />
  </div>
</template>

<script>
import Timer from "./components/Timer.vue";

export default {
  components: {
    Timer,
  },
};
</script>

<style></style>
