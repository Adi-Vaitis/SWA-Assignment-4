<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleSubmit">
      <label for="username">Email</label>
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

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import RegisterViewModel from "@/viewmodel/RegisterViewModel";
import { User } from "@/model/user";

@Options({
  components: {},
  data() {
    return {
      username: "",
      password: "",
      viewModel: new RegisterViewModel(), // Initialize the viewModel here
    };
  },
  methods: {
    handleSubmit() {
      const userForRegister: User = {
        username: this.username,
        password: this.password,
      } as User;
      this.viewModel.RegisterUser(userForRegister);
    },
  },
})
export default class RegisterView extends Vue {}
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
