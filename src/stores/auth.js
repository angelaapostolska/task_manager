// Utilities
import { defineStore } from "pinia";
import _axios, { setAuthToken } from "../plugins/axios";
import { handleError } from "vue";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    user: null,
    error: null,
  }),
  getters: {
    getUser: (state) => {
      return state.user;
    },
  },
  actions: {
    async login(email, password, router) {
      this.error = null; // clear old errors
      try {
        const response = await _axios.post("/login", {
          email: email,
          password: password,
        });
        // If successful
        this.token = response.data.access_token;
        this.user = response.data.user;
        setAuthToken(this.token);
        if (response.status == 200) {
          router.push("/home");
        }
      } catch (error) {
        // Error handling
        this.error = handleError(error);
        console.log(error);
      }
    },
  },
});
