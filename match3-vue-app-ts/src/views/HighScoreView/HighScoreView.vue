<template>
  <div>
    <h1>HighScore</h1>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem("token");
    if (!token) {
      next("/login");
    } else {
      next();
    }
  },
};
</script>
