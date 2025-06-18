// Utilities
import { defineStore } from "pinia";
import api, { setAuthToken } from "../plugins/axios";
import axios from "axios";
import { handleError, toHandlers } from "vue";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("access_token") || null,
    user: null,
    error: null,
  }),
  getters: {
    getUser: (state) => {
      return state.user;
    },
    isLoggedIn: (state) => {
      return !!state.user && !!state.token;
    },
  },
  actions: {
    async register(userData) {
      this.error = null;
      try {
        const response = await api.post("/register", userData);

        this.user = response.data.user;
        this.token = response.data.access_token; //storing the user's token in pinia state
        localStorage.setItem("access_token", this.token); //persisting the token in local storage
        setAuthToken(this.token);
        return { success: true, message: response.data.message };
      } catch (error) {
        if (error.response && error.response.data) {
          this.error = error.response.data.message || "Registration failed.";
          if (error.response.data.errors) {
            console.error("Validation errors:", error.response.data.errors);
            this.error +=
              " " + Object.values(error.response.data.errors).flat().join(" ");
          }
        } else if (axios.isAxiosError(error) && error.code === "ERR_NETWORK") {
          this.error =
            "Network Error. Please check your Laravel server (running on 8001?) or your internet connection.";
        } else {
          this.error = "An unexpected error occurred.";
        }
        console.error("Registration error:", error);
        return { success: false, error: this.error };
      }
    },
    async login(email, password, router) {
      this.error = null;
      try {
        const response = await api.post("/login", { email, password });

        // If successful
        this.token = response.data.access_token; //store user token in pinia
        this.user = response.data.user; // store user data in pinia
        localStorage.setItem("access_token", this.token);
        setAuthToken(this.token);

        if (response.status == 200) {
          router.push("/home"); // redirect to home
        }
        return { success: true, message: "Logged in successfully!" };
      } catch (error) {
        if (error.response && error.response.data) {
          this.error = error.response.data.message || "Login failed.";
        } else if (axios.isAxiosError(error) && error.code === "ERR_NETWORK") {
          this.error =
            "Network Error. Please check your Laravel server (running on 8001?) or your internet connection.";
        } else {
          this.error = "An unexpected error occurred.";
        }
        console.error("Login error:", error);
        return { success: false, error: this.error };
      }
    },
    async logout(router) {
      this.error = null;
      try {
        await api.post("/logout");
        localStorage.removeItem("access_token");

        // this.token = null;
        // this.user = null;
        // setAuthToken(null);

        if (router) {
          router.push("/login");
        }
        return { success: true, message: "Logged out successfully!" };
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === "ERR_NETWORK") {
          this.error =
            "Network Error during logout. Please check your internet connection.";
        } else if (error.response && error.response.data) {
          this.error = error.response.data.message || "Logout failed.";
        } else {
          this.error = "An unexpected error occurred during logout.";
        }
        console.error("Logout error:", error);
        return { success: false, error: this.error };
      }
    },
    async getMe() {
      const response = await api.post("/me");
      this.user = response.data.user;
      console.log(this.user);

      this.token = response.data.access_token; //storing the user's token in pinia state
    },
  },
});
