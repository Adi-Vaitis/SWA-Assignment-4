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
      <p class="danger-message" v-if="!usernameIsValid && !loginSuccess">
        Your username or your password is incorrect
      </p>
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        v-model="password"
      />
      <p class="danger-message" v-if="!passwordIsValid && !loginSuccess">
        Your username or your password is incorrect
      </p>
      <button v-if="passwordIsValid && usernameIsValid" type="submit">
        Login
      </button>
      <button v-else type="submit" disabled>Login</button>
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
      this.usernameIsValid = value.length > 3;
    },
    password(value) {
      this.passwordIsValid = value.length > 3;
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
            localStorage.setItem("token", returnLoggedInToken);
            this.loginSuccess = true;
            this.isFetching = false;
            this.$router.push("/");
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
  beforeMount() {
    // something to mount
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
