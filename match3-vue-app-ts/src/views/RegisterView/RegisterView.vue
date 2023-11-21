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

<script setup lang="ts">
import { ref } from "vue";
import RegisterViewModel from "@/viewmodel/RegisterViewModel";
import { User } from "@/model/user";
import { onMounted } from "vue";

const username = ref("");
const password = ref("");
const viewModel = new RegisterViewModel();

onMounted(() => {
  console.log("RegisterView mounted");
});

const handleSubmit = () => {
  const userForRegister: User = {
    username: username.value,
    password: password.value,
  } as User;
  viewModel.RegisterUser(userForRegister);
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
