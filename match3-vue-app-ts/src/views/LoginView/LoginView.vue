<template>
  <div>
    <h1>Login</h1>
    <h3 v-if="isFetching">Loading...</h3>
    <form v-if="!isFetching" @submit.prevent="loginUser">
      <label for="username">Username</label>
      <input
        id="username"
        type="text"
        placeholder="Username"
        v-model="username"
      />
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        v-model="password"
      />
      <p class="danger-message" v-if="loginFailed">
        Your username or password is incorrect
      </p>
      <button
        type="submit"
        :disabled="isFetching || !(passwordIsValid && usernameIsValid)"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>
import { UserService } from "@/api/user.service";

export default {
  data() {
    return {
      isFetching: false,
      username: "",
      password: "",
      usernameIsValid: false,
      passwordIsValid: false,
      loginSuccess: false,
      loginFailed: false,
    };
  },
  watch: {
    username(value) {
      this.usernameIsValid = value.length > 0;
    },
    password(value) {
      this.passwordIsValid = value.length > 0;
    },
  },
  methods: {
    loginUser() {
      this.isFetching = true;
      if (this.username && this.password) {
        UserService.login({
          username: this.username,
          password: this.password,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((returnLoggedInToken) => {
            localStorage.setItem("token", JSON.stringify(returnLoggedInToken));
            this.loginSuccess = true;
            this.isFetching = false;
            this.$router.push({ path: "/", query: { loggedIn: true } });
          })
          .catch((error) => {
            this.loginFailed = true;
            this.isFetching = false;
            console.error(
              "There has been a problem with your fetch operation:",
              error
            );
          });
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem("token");
    if (token) {
      next("/");
    } else {
      next();
    }
  },
};
</script>
<style>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.danger-message {
  color: red;
  font-size: 12px;
  margin: 0;
  padding: 0;
}

.success-message {
  color: green;
  font-size: 12px;
  margin: 0;
  padding: 0;
}

input {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #ccc;
  cursor: pointer;
}
</style>
