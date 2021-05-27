import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Login from "../views/Login.vue";

const routes = [
  {
    path: '/',
    redirect: {
        name: "Login"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: Welcome,
    meta: {
        requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth) {
      if (window.localStorage.getItem('_token')) next()
      else next('login')
    } else {
      next()
    }
});

export default router
