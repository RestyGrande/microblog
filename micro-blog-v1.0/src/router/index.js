import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Nprogress from "nprogress";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "Register" */ "../views/Register.vue"),
  },

  {
    path: "/dashboard/:userId",
    name: "Dashboard",
    props: true,
    component: () =>
      import(/* webpackChunkName: "Dashboard" */ "../views/Dashboard.vue"),
    meta: { requireAuth: false },
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "PageNotFound" */ "../views/NotFound.vue"),
  },
  {
    path: "/404/:message",
    name: "404Resource",
    props: true,
    component: () =>
      import(/* webpackChunkName: "PageNotFound" */ "../views/NotFound.vue"),
  },
  {
    path: "/network-error",
    name: "NetworkError",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "NetworkError" */ "../views/NetworkError.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from) => {
  Nprogress.start();
  const notAuthorized = true;
  if (to.meta.requireAuth && notAuthorized) {
    alert("Sorry, you are not authorized to view this page");
    return false;
  }
});
router.afterEach(() => {
  Nprogress.done();
});
export default router;
