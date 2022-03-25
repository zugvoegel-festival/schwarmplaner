import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "",
    component: () => import("../views/login/Index"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/layouts/Admin"),
    children: [
      {
        path: "/admin",
        name: "adminDashboard",
        component: () => import("../views/admin/dashboard/Index"),
      },
      {
        path: "/shifts",
        name: "shifts",
        component: () => import("../views/admin/shifts/Index"),
      },
      {
        path: "/helper",
        name: "helper",
        component: () => import("../views/admin/helper/Index"),
      },
      {
        path: "/settings",
        name: "settings",
        component: () => import("../views/admin/settings/Index"),
      },
    ],
  },
  {
    path: "/user",
    name: "",
    component: () => import("../views/layouts/User"),
    children: [
      {
        path: "/dashboard",
        name: "userDashboard",
        component: () => import("../views/user/dashboard/Index"),
      },
      {
        path: "/shift",
        name: "shift",
        component: () => import("../views/user/shift/Index"),
      },
      {
        path: "/trade",
        name: "trade",
        component: () => import("../views/user/trade/Index"),
      },
      {
        path: "/coordinator",
        name: "coordinator",
        component: () => import("../views/user/coordinator/Index"),
      },
    ],
  },
  {
    path: "/locations",
    name: "",
    component: () => import("../views/layouts/Locations"),
    children: [
      {
        path: "/rotator",
        name: "rotator",
        component: () => import("../views/locations/rotator/Index"),
      },
      {
        path: "/static",
        name: "static",
        component: () => import("../views/locations/static/Index"),
      },
    ],
  },
];

const router = new Router({
  base: process.env.BASE_URL || "/",
  mode: "history",
  routes,
});

export default router;
