<template>
  <div class="color" :style="{ 'background-color': color }"></div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
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
