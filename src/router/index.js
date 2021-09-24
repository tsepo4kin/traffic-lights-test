import Vue from "vue";
import VueRouter from "vue-router";
import TrafficLights from "../views/TrafficLights.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "TrafficLights",
    component: TrafficLights,
  },
  {
    path: "/red",
    name: "red",
    component: TrafficLights,
  },
  {
    path: "/yellow",
    name: "yellow",
    component: TrafficLights,
  },
  {
    path: "/green",
    name: "green",
    component: TrafficLights,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
