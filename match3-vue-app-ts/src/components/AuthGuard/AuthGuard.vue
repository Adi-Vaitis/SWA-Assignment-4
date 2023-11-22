<template>
  <div v-if="isAuthenticated">
    <router-view />
  </div>
  <div v-else>
    <router-view name="public" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem("token");
    if (token) {
      next((vm) => {
        vm.isAuthenticated = true;
      });
    } else {
      next();
    }
  },
};
</script>
