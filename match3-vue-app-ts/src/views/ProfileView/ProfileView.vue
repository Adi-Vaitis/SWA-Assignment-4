<template>
  <div class="profile-view">
    <h1>Profile</h1>
    <div v-if="isFetching">Loading...</div>
    <div v-else>
      <div>
        <p>Username: {{ user.username }}</p>
      </div>
      <div>
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="user.password"
          v-bind:disabled="isFetching"
        />
      </div>
      <div>
        <button @click="updateUserProfile" v-bind:disabled="isFetching">
          Update profile
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { UserService } from "@/api/user.service";
import { useToast } from "vue-toastification";
import { ref, watch } from "vue";
import { setup } from "vue-class-component";

export default {
  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem("token");
    if (!token) {
      next("/login");
    } else {
      next();
    }
  },
  setup() {
    const profileUpdated = ref(false);
    return {
      profileUpdated,
    };
  },
  data() {
    return {
      user: {},
      isFetching: false,
      token: JSON.parse(localStorage.getItem("token") || "{}"),
    };
  },
  methods: {
    fetchUser() {
      this.isFetching = true;
      UserService.getUser(this.token)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((returnedUser) => {
          this.user = returnedUser;
          this.isFetching = false;
        })
        .catch((error) => {
          this.isFetching = false;
        });
    },
    async updateUserProfile() {
      this.isFetching = true;

      try {
        const response = await UserService.updateUserProfile(
          this.token,
          this.user
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        this.isFetching = false;
        this.profileUpdated = true;
      } catch (error) {
        this.isFetching = false;
      }
    },
  },
  mounted() {
    this.fetchUser();
    this.$watch(
      () => this.profileUpdated,
      (newValue) => {
        if (newValue) {
          const toast = useToast();
          toast.success("Profile updated successfully");
          this.profileUpdated = false;
        }
      }
    );
  },
};
</script>
