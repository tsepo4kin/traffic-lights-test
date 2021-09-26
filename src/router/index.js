import Vue from "vue";
import VueRouter from "vue-router";
import TrafficLights from "../views/TrafficLights.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: ":LightColor",
    name: "TrafficLights",
    component: TrafficLights,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
