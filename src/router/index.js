/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
//import { routes } from "vue-router/auto-routes";
import index from "@/pages/tasks.vue";
import login from "@/pages/login.vue";
import { components } from "vuetify/dist/vuetify.js";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "home",
    component: index,
    meta: { requiresAuth: true, layout: "default" },
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: { layout: "empty" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access_token");
  if (to.meta.requiresAuth) {
    if (token) {
      // User is authenticated, proceed to the route
      next();
    } else {
      // User is not authenticated, redirect to login
      next("/login");
    }
  } else {
    if (token && (to.path === "/login" || to.path === "/")) {
      next("/home");
    } else {
      next();
    }
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
