<template>
  <div class="TrafficLights">
    <light
      v-for="(color, i) in calcColors"
      :key="i"
      :color="color"
      :blinking="blinking[i]"
      :defaultColor="defaultColors[i]"
    ></light>
  </div>
</template>

<script>
import Light from "@/components/Light.vue";

export default {
  name: "TrafficLights",
  components: {
    Light,
  },
  props: {
    colorStart: {
      require: true,
    },
    startTime: {
      type: Number,
    },
  },
  data: () => ({
    defaultColors: ["#3c0000", "#3c3c00", "#003c00"],
    color: null,
    time: null,
    interval: null,
    blinking: [false, false, false],
    pattern: null,
  }),
  watch: {
    colorStart: function (newVal) {
      if (typeof newVal == "string") {
        this.color = newVal;
      }
    },
  },
  computed: {
    calcColors() {
      let res = [];
      for (let i of this.defaultColors) {
        res.push(i);
      }
      if (this.color == "red") {
        res[0] = this.color;
      } else if (this.color == "yellow") {
        res[1] = this.color;
      } else if (this.color == "green") {
        res[2] = this.color;
      }
      return res;
    },
  },
  methods: {
    changeColors(pattern, cb) {
      clearInterval(this.interval);
      this.time = 0;
      cb(pattern);
      if (this.$route.path !== pattern.path) {
        this.$router.push(pattern.path);
      }
      setTimeout(() => {
        this.changeColors(pattern.next, cb);
      }, pattern.time * 1000);

      this.time--;
      this.$emit("timer", this.time);

      this.interval = setInterval(() => {
        this.time--;
        this.checkBlinking();
        this.$emit("timer", this.time);
      }, 1000);
    },

    setLocalstorage() {
      localStorage.setItem(
        "trafficLight",
        JSON.stringify({ pattern: this.pattern, time: this.time })
      );
    },

    checkBlinking() {
      if (this.time <= 3 && this.color != "yellow") {
        if (this.color == "red") {
          this.blinking = [true, false, false];
        }
        if (this.color == "green") {
          this.blinking = [false, false, true];
        }
      } else {
        this.blinking = [false, false, false];
      }
    },
  },
  async mounted() {
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

    let patternsArr = [red, yellowG, green];

    let cb = (pattern) => {
      this.time = pattern.time + 1;
      this.color = pattern.color;
      this.pattern = { color: pattern.color, nextColor: pattern.next.color };
      if (this.$route.path != pattern.path) {
        this.$router.push(pattern.path);
      }
    };

    window.addEventListener("beforeunload", this.setLocalstorage);

    await this.$nextTick();

    if (this.startTime) {
      let storagePattern;
      for (let item of patternsArr) {
        if (
          item.color == this.colorStart.color &&
          item.next.color == this.colorStart.nextColor
        ) {
          storagePattern = new Pattern(
            item.color,
            this.startTime,
            item.path,
            item.next
          );
        }
      }
      this.changeColors(storagePattern, cb);
    } else {
      for (let item of patternsArr) {
        if (this.colorStart == item.color) {
          this.changeColors(item, cb);
        }
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
    window.removeEventListener("beforeunload", this.setLocalstorage);
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
