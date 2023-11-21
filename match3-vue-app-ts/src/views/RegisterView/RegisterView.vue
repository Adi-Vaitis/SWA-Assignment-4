<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleSubmit">
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
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import RegisterViewModel from "@/viewmodel/RegisterViewModel";

export default {
  data() {
    return {
      username: "",
      password: "",
      viewModel: new RegisterViewModel(),
    };
  },
  beforeMount() {
    console.log("RegisterView doing stuff before mount");
  },
  methods: {
    handleSubmit() {
      const userForRegister = {
        username: this.username,
        password: this.password,
      };
      this.viewModel.RegisterUser(userForRegister);
    },
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
