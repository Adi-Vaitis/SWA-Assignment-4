<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      |
      <router-link to="/register">Register</router-link>
      |
      <router-link to="/login">Login</router-link>
    </nav>
    <AuthGuard>
      <router-view />
    </AuthGuard>
  </div>
</template>

<script>
import AuthGuard from "@/components/AuthGuard/AuthGuard.vue";

export default {
  components: {
    AuthGuard,
  },
  routes: [
    {
      path: "/",
      component: AuthGuard,
      children: [
        {
          path: "",
          component: () => import("@/views/HomeView/HomeView.vue"), // Replace with your actual MainPage component
        },
      ],
    },
    {
      path: "/register",
      component: () => import("@/views/RegisterView/RegisterView.vue"), // Replace with your actual RegisterView component
    },
    {
      path: "/login",
      component: () => import("@/views/LoginView/LoginView.vue"), // Replace with your actual LoginView component
    },
  ],
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
