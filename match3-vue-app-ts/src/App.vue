<template>
  <div>
    <nav v-if="isAuthenticated">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/highScore">High Score</router-link>
    </nav>
    <nav v-if="!isAuthenticated">
      <router-link to="/login">Login</router-link>
      |
      <router-link to="/register">Register</router-link>
    </nav>
    <notifications group="foo" />
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false,
    };
  },
  watch: {
    $route(to, from) {
      if (to.query.loggedIn) {
        this.updateAuthenticationStatus(true);
      } else if (to.query.registered) {
        this.updateAuthenticationStatus(false);
      }
    },
  },
  methods: {
    updateAuthenticationStatus(isAuthenticated) {
      this.isAuthenticated = isAuthenticated;
    },
  },
  beforeMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.updateAuthenticationStatus(true);
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
