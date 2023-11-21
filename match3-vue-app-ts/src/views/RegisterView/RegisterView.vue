<template>
  <div>
    <h1>Register</h1>
    <h3 v-if="isFetching">Loading...</h3>
    <form v-if="!isFetching" @submit.prevent="registerUser">
      <label for="username">Username</label>
      <input
        id="username"
        type="text"
        placeholder="Username"
        v-model="username"
      />
      <p class="danger-message" v-if="!usernameIsValid && !registerSuccess">
        Please enter a valid username (Minimum 3 characters)
      </p>
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        v-model="password"
      />
      <p class="danger-message" v-if="!passwordIsVaid && !registerSuccess">
        Please enter a valid password (Minimum 3 characters)
      </p>
      <button v-if="passwordIsVaid && usernameIsValid" type="submit">
        Register
      </button>
      <button v-else type="submit" disabled>Register</button>
    </form>
    <p v-if="registerSuccess" class="success-message">
      You have registered! Press
      <span><a href="/login"> redirect </a> to go to login page.</span>
      <br />
      Otherwise you will be directed in
      {{ secondsRemainedUntilRedirect }} seconds.
    </p>
  </div>
</template>

<script>
import { UserService } from "@/api/user.service";

export default {
  // data() corresponds to the Model in MVVM
  data() {
    return {
      isFetching: false,
      username: "",
      password: "",
      usernameIsValid: false,
      passwordIsVaid: false,
      registerSuccess: false,
      registerFailed: false,
      secondsRemainedUntilRedirect: 5,
    };
  },
  watch: {
    username(value) {
      this.usernameIsValid = value.length > 3;
    },
    password(value) {
      this.passwordIsVaid = value.length > 3;
    },
    registerSuccess(value) {
      if (value) {
        this.startCountdown();
      }
    },
  },
  // methods correponds to the ViewModel in MVVM
  methods: {
    registerUser() {
      this.isFetching = true;
      if (this.username && this.password) {
        UserService.register({
          username: this.username,
          password: this.password,
        }).then((response) => {
          if (response.status === 201) {
            this.registerSuccess = true;
            this.registerFailed = false;
            this.username = "";
            this.password = "";
            this.isFetching = false;
          } else {
            this.registerSuccess = false;
            this.registerFailed = true;
            this.isFetching = false;
          }
        });
      }
    },
    startCountdown() {
      const timer = setInterval(() => {
        if (this.secondsRemainedUntilRedirect > 0) {
          this.secondsRemainedUntilRedirect--;
        } else {
          clearInterval(timer);
          this.$router.push("/login");
        }
      }, 1000);
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
