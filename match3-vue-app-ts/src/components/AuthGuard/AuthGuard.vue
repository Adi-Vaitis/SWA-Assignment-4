<template>
  <div>
    <router-view v-if="isAuthenticated" />
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
    if (!token) {
      next("/login");
    } else {
      next((vm) => {
        vm.isAuthenticated = true;
      });
    }
  },
};
</script>
