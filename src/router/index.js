import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "TrafficLights",
    component: () => import("../views/TrafficLights.vue"),
  },
  {
    path: "/red",
    name: "red",
    component: () => import("../views/TrafficLights.vue"),
  },
  {
    path: "/yellow",
    name: "yellow",
    component: () => import("../views/TrafficLights.vue"),
  },
  {
    path: "/green",
    name: "green",
    component: () => import("../views/TrafficLights.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
