<template>
  <div>
    <nav v-if="isAuthenticated">
      <router-link to="/">Home</router-link>
    </nav>
    <nav v-if="!isAuthenticated">
      <router-link to="/login">Login</router-link>
      |
      <router-link to="/register">Register</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import AuthGuard from "@/components/AuthGuard/AuthGuard.vue";

export default {
  data() {
    return {
      isAuthenticated: false,
    };
  },
  watch: {
    $route(to, from) {
      if (to.query.loggedIn) {
        this.isAuthenticated = true;
      } else if (to.query.registered) {
        this.isAuthenticated = false;
      }
    },
  },
  beforeMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.isAuthenticated = true;
    }
  },
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
