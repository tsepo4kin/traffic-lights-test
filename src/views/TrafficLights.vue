<template>
  <div class="TrafficLights">
    <light
      v-for="(item, i) in data"
      :key="i"
      :color="item.color"
      :blinking="item.blinking"
    ></light>
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
    color: {
      type: String,
    },
    blinking: {
      type: Boolean,
    },
  },
  data: () => ({
    data: [
      {
        color: null,
        blinking: false,
      },
      {
        color: null,
        blinking: false,
      },
      {
        color: null,
        blinking: false,
      },
    ],
  }),
  watch: {
    color: function (newVal) {
      if (newVal == "red") {
        this.data[0].color = "red";
        this.data[1].color = "gray";
        this.data[2].color = "gray";
      } else if (newVal == "yellow") {
        this.data[0].color = "gray";
        this.data[1].color = "yellow";
        this.data[2].color = "gray";
      } else {
        this.data[0].color = "gray";
        this.data[1].color = "gray";
        this.data[2].color = "green";
      }
    },
    blinking: function (newVal) {
      this.data = this.data.map((el) => {
        if (el.color == this.color) {
          el.blinking = newVal;
        } else {
          el.blinking = false;
        }
        return el;
      });
    },
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
