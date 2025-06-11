// Utilities
import { defineStore } from "pinia";
import api, { getCsrfCookie, setAuthToken } from "../plugins/axios";
import axios from "axios";
import { handleError, toHandlers } from "vue";

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
    async register(userData) {
      this.error = null;
      try {
        await getCsrfCookie();
        const response = await api.post("/register", userData);

        this.user = response.data.user;
        if (response.data.access_token) {
          localStorage.setItem("access_token", response.data.access_token);
          setAuthToken(response.data.access_token);
        }
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
        // This is already correct
        await getCsrfCookie();
        const response = await api.post("/login", { email, password });

        // If successful
        this.token = response.data.access_token; // Assuming you store token on successful login
        this.user = response.data.user; // Assuming user data is returned
        localStorage.setItem("access_token", this.token);
        setAuthToken(this.token);
        if (response.status == 200) {
          router.push("/home"); // Adjust your redirect path as needed
        }
        return { success: true, message: "Logged in successfully!" };
      } catch (error) {
        // Error handling
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
  },
});
